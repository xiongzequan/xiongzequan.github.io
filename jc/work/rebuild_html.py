from pathlib import Path
from bs4 import BeautifulSoup
import html
import re

ROOT = Path(__file__).resolve().parents[1]
CH = ROOT / "chapters"

ORDER = [
    ("00-preface", "序言：从信息素养到数据素养的必然"),
    ("01-information-literacy", "第一章 信息素养基础"),
    ("02-information-access", "第二章 如何获取信息"),
    ("03-information-evaluation", "第三章 如何评价信息"),
    ("04-open-science", "第四章 开放科学资源"),
    ("05-frontiers", "第五章 如何探索学科前沿热点"),
    ("06-personal-information-management", "第六章 如何高效管理个人信息"),
    ("07-informetrics", "第七章 信息计量理论与工具"),
    ("08-data-literacy", "第八章 数据素养基础"),
    ("09-data-acquisition", "第九章 数据检索与获取"),
    ("10-data-cleaning", "第十章 数据管理与清洗"),
    ("11-regression-clustering", "第十一章 回归与聚类"),
    ("13-data-visualization", "第十二章 数据可视化"),
    ("14-academic-ethics", "第十三章 学术规范与伦理"),
]


def inline(s: str) -> str:
    image_tokens = []

    def keep_image(match):
        token = f"@@IMG{len(image_tokens)}@@"
        tag = match.group(0)
        if "class=" not in tag:
            tag = tag.replace("<img", '<img class="inline-icon"', 1)
        image_tokens.append(tag)
        return token

    s = re.sub(r"<img\b[^>]*?/?>", keep_image, s)
    s = html.escape(s)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)

    def link(match):
        label, href = match.group(1), match.group(2)
        if not re.match(r"^(https?:|mailto:|#)", href):
            href = re.sub(r"\.md($|#)", r".html\1", href)
        return f'<a href="{href}">{label}</a>'

    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, s)
    for i, tag in enumerate(image_tokens):
        s = s.replace(html.escape(f"@@IMG{i}@@"), tag)
    return s


def markdown_image(line: str):
    match = re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", line.strip())
    if not match:
        return None
    alt, src = match.group(1), match.group(2)
    return f'<img src="{html.escape(src, quote=True)}" alt="{html.escape(alt, quote=True)}" />'


def html_image(line: str):
    match = re.fullmatch(r"<img\b[^>]*?/?>", line.strip())
    return match.group(0) if match else None


def enhance_media(body: str) -> str:
    soup = BeautifulSoup(f"<div>{body}</div>", "html.parser")
    root = soup.div

    for table in list(root.find_all("table", recursive=False)):
        prev = table.find_previous_sibling()
        if prev and prev.name == "p" and re.match(r"^表\d+[-－—\.．]?\d*", prev.get_text(strip=True)):
            block = soup.new_tag("figure")
            block["class"] = "table-figure"
            caption = soup.new_tag("figcaption")
            caption.string = prev.get_text(strip=True)
            scroll = soup.new_tag("div")
            scroll["class"] = "table-scroll"
            prev.replace_with(block)
            block.append(caption)
            table.extract()
            scroll.append(table)
            block.append(scroll)

    children = [c for c in root.children if not (isinstance(c, str) and not c.strip())]
    i = 0
    while i < len(children):
        child = children[i]
        if getattr(child, "name", None) != "img":
            i += 1
            continue
        imgs = []
        j = i
        while j < len(children) and getattr(children[j], "name", None) == "img":
            imgs.append(children[j])
            j += 1
        caption_node = children[j] if j < len(children) else None
        if getattr(caption_node, "name", None) == "p" and re.match(r"^图\d+[-－—\.．]?\d*", caption_node.get_text(strip=True)):
            figure = soup.new_tag("figure")
            figure["class"] = "figure"
            child.replace_with(figure)
            for img in imgs:
                if img is not child:
                    img.extract()
                figure.append(img)
            caption = soup.new_tag("figcaption")
            caption.string = caption_node.get_text(strip=True)
            caption_node.extract()
            figure.append(caption)
            children = [c for c in root.children if not (isinstance(c, str) and not c.strip())]
            i += 1
        else:
            i = j

    return "".join(str(c) for c in root.contents)


def mdhtml(md: str) -> str:
    md = re.sub(
        r"<img\b([^>\n]*)\n\s*([^>\n]*?)>",
        lambda m: "<img " + re.sub(r"\s+", " ", (m.group(1) + " " + m.group(2)).strip()) + ">",
        md,
    )
    out, table = [], []
    ul = ol = code = False
    img_buf = []

    def close_lists():
        nonlocal ul, ol
        if ul:
            out.append("</ul>")
            ul = False
        if ol:
            out.append("</ol>")
            ol = False

    def flush_table():
        nonlocal table
        if not table:
            return
        rows = [[c.strip() for c in r.strip().strip("|").split("|")] for r in table]
        if len(rows) > 2 and not any(rows[0]) and set("".join(rows[1])) <= set("-: "):
            header = rows[2]
            body = rows[3:]
        else:
            header = rows[0]
            body = rows[2:] if len(rows) > 1 and set("".join(rows[1])) <= set("-: ") else rows[1:]
        out.append("<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in header) + "</tr></thead><tbody>")
        for r in body:
            out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
        out.append("</tbody></table>")
        table = []

    def flush_img():
        nonlocal img_buf
        if not img_buf:
            return
        out.append(" ".join(part.strip() for part in img_buf))
        img_buf = []

    for raw in md.splitlines():
        line = raw.rstrip()
        if img_buf:
            img_buf.append(line)
            if ">" in line:
                flush_table()
                close_lists()
                flush_img()
            continue
        if line.startswith("```"):
            flush_img()
            flush_table()
            close_lists()
            out.append("</code></pre>" if code else "<pre><code>")
            code = not code
            continue
        if code:
            out.append(html.escape(line) + "\n")
            continue
        image_html = markdown_image(line)
        if image_html:
            flush_table()
            close_lists()
            out.append(image_html)
            continue
        raw_image_html = html_image(line)
        if raw_image_html:
            flush_table()
            close_lists()
            out.append(raw_image_html)
            continue
        if line.startswith("|") and line.endswith("|"):
            flush_img()
            close_lists()
            table.append(line)
            continue
        flush_img()
        flush_table()
        if not line.strip():
            close_lists()
            continue
        if line.startswith("#"):
            close_lists()
            n = len(line) - len(line.lstrip("#"))
            out.append(f"<h{n}>{inline(line[n:].strip())}</h{n}>")
        elif line.startswith(">"):
            close_lists()
            out.append(f"<blockquote>{inline(line[1:].strip())}</blockquote>")
        elif re.match(r"^[-*] ", line):
            if not ul:
                close_lists()
                out.append("<ul>")
                ul = True
            out.append(f"<li>{inline(line[2:].strip())}</li>")
        elif re.match(r"^\d+\. ", line):
            if not ol:
                close_lists()
                out.append("<ol>")
                ol = True
            out.append(f"<li>{inline(re.sub(r'^\d+\. ', '', line).strip())}</li>")
        else:
            close_lists()
            out.append(f"<p>{inline(line)}</p>")
    flush_img()
    flush_table()
    close_lists()
    return enhance_media("\n".join(out))


def page(title, body, active, depth="root", prev=None, nxt=None):
    home = "../index.html" if depth == "chapter" else "index.html"
    prefix = "" if depth == "chapter" else "chapters/"
    css = "../assets/style.css" if depth == "chapter" else "assets/style.css"
    ref = "../references.html" if depth == "chapter" else "references.html"
    nav = [f'<a class="{"active" if active == "home" else ""}" href="{home}">目录</a>']
    nav += [f'<a class="{"active" if active == s else ""}" href="{prefix}{s}.html">{t}</a>' for s, t in ORDER]
    nav += [f'<a class="{"active" if active == "references" else ""}" href="{ref}">参考资料</a>']
    pager = ""
    if prev or nxt:
        pager = '<div class="pager">' + (f'<a href="{prev}">上一章</a>' if prev else "<span></span>") + (f'<a href="{nxt}">下一章</a>' if nxt else "<span></span>") + "</div>"
    return f'<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{html.escape(title)}</title><link rel="stylesheet" href="{css}"></head><body><div class="layout"><aside><h1>教育学文献检索与数据分析</h1><nav>' + "\n".join(nav) + f"</nav></aside><main>{body}{pager}</main></div></body></html>"


def main():
    (ROOT / "index.html").write_text(page("教育学文献检索与数据分析", mdhtml((ROOT / "index.md").read_text(encoding="utf-8")), "home"), encoding="utf-8")
    for i, (slug, title) in enumerate(ORDER):
        prev = "../index.html" if i == 0 else f"{ORDER[i - 1][0]}.html"
        nxt = f"{ORDER[i + 1][0]}.html" if i + 1 < len(ORDER) else "../references.html"
        (CH / f"{slug}.html").write_text(page(title, mdhtml((CH / f"{slug}.md").read_text(encoding="utf-8")), slug, "chapter", prev, nxt), encoding="utf-8")
    (ROOT / "references.html").write_text(page("参考资料与来源说明", mdhtml((ROOT / "references.md").read_text(encoding="utf-8")), "references"), encoding="utf-8")
    print("HTML rebuilt from existing Markdown.")


if __name__ == "__main__":
    main()
