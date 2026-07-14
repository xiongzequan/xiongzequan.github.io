from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ROOT / "chapters"


COMMON_REPLACEMENTS = [
    (r"Information\s*\n\s*Retrieval", "Information Retrieval"),
    (r"Information\s*\n\s*Literacy", "Information Literacy"),
    (r"Information Literacy,\s*\n\s*IL", "Information Literacy, IL"),
    (r"Web\s*\n\s*of\s*\n\s*Science", "Web of Science"),
    (r"Web of\s*\n\s*Science", "Web of Science"),
    (r"Web\s*\n\s*of Science", "Web of Science"),
    (r"Google\s*\n\s*Scholar", "Google Scholar"),
    (r"Science\s*\n\s*Direct", "ScienceDirect"),
    (r"Science Citation\s*\n\s*Index", "Science Citation Index"),
    (r"The Engineering\s*\n\s*Index", "The Engineering Index"),
    (r"Index to Scientific & Technical\s*\n\s*Proceedings", "Index to Scientific & Technical Proceedings"),
    (r"China\s*\n\s*National Knowledge", "China National Knowledge"),
    (r"Chinese\s*\n\s*Social Science Citation Index", "Chinese Social Science Citation Index"),
    (r"Chinese Social Sciences Citation\s*\n\s*Index", "Chinese Social Sciences Citation Index"),
    (r"Chinese\s*\n\s*Science Citation Database", "Chinese Science Citation Database"),
    (r"Chinese Science Citation\s*\n\s*Database", "Chinese Science Citation Database"),
    (r"EndNote\s*\n\s*online", "EndNote online"),
    (r"Download\s*\n\s*PDFs", "Download PDFs"),
    (r"Download\s*\n\s*Awards", "Download Awards"),
    (r"Related\s*\n\s*Records", "Related Records"),
    (r"Institute for\s*\n\s*Science Information", "Institute for Science Information"),
    (r"Chemical\s*\n\s*Abstract", "Chemical Abstract"),
    (r"BIOSIS Citation\s*\n\s*IndexSM", "BIOSIS Citation IndexSM"),
    (r"Science Abstract,\s*\n\s*SA", "Science Abstract, SA"),
    (r"Analytical\s*\n\s*Abstracts", "Analytical Abstracts"),
    (r"equipment\s*\n\s*manufacturers", "equipment manufacturers"),
    (r"application\s*\n\s*notes", "application notes"),
    (r"National\s*\n\s*Library of\s*\n\s*Medicine", "National Library of Medicine"),
    (r"National Library of\s*\n\s*Medicine", "National Library of Medicine"),
    (r"Retrieval-Augmented\s*\n\s*Generation", "Retrieval-Augmented Generation"),
    (r"Nature\s*\n\s*Human Behavior", "Nature Human Behavior"),
    (r"Data, measurement and empirical\s*\n\s*methods in the science of\s*\n\s*science", "Data, measurement and empirical methods in the science of science"),
    (r"Digital\s*\n\s*Science", "Digital Science"),
    (r"Derwent World Patents\s*\n\s*Index", "Derwent World Patents Index"),
    (r"Derwent Patents Citation\s*\n\s*Index", "Derwent Patents Citation Index"),
    (r"Derwent Innovations\s*\n\s*Index", "Derwent Innovations Index"),
    (r"Original\s*\n\s*Document", "Original Document"),
    (r"Patent Cooperation\s*\n\s*Treaty", "Patent Cooperation Treaty"),
    (r"Microsoft\s*\n\s*Bing", "Microsoft Bing"),
    (r"Live\s*\n\s*Search", "Live Search"),
    (r"DocIn\s*\n\s*API", "DocIn API"),
    (r"Inspire\s*\n\s*Lives", "Inspire Lives"),
    (r"Open\s*\n\s*Access", "Open Access"),
    (r"Association of Research\s*\n\s*Libraries", "Association of Research Libraries"),
    (r"Research\s*\n*Libraries", "Research Libraries"),
    (r"HighWire\s*\n\s*Press", "HighWire Press"),
    (r"Journal\s*\n\s*of Biological\s*\n\s*Chemistry", "Journal of Biological Chemistry"),
    (r"View\s*\n\s*by Subject", "View by Subject"),
    (r"View\s*\n\s*Alphabetically", "View Alphabetically"),
    (r"Search all journals", "Search all journals"),
    (r"e-print\s*\n\s*arXiv", "e-print arXiv"),
    (r"Los\s*\n\s*Alamos", "Los Alamos"),
    (r"American Physical\s*\n\s*Society", "American Physical Society"),
    (r"Institute of\s*\n\s*Physics", "Institute of Physics"),
]


def looks_like_joinable(left: str, right: str) -> bool:
    left_s = left.rstrip()
    right_s = right.lstrip()
    if not left_s or not right_s:
        return False
    if left_s.startswith(("#", "|", "!", "<")) or right_s.startswith(("#", "|", "!", "<")):
        return False
    if re.match(r"^(\s*[-*+]\s+|\s*\d+[.)]\s+)", right_s):
        return False
    if re.match(r"^\[\^[^\]]+\]:", right_s):
        return False
    if re.search(r"[A-Za-z,&(/\-\"]$", left_s) and re.match(r"^[A-Za-z0-9(\"']", right_s):
        return True
    return False


def normalize_segment(segment: str) -> str:
    for pattern, repl in COMMON_REPLACEMENTS:
        segment = re.sub(pattern, repl, segment)

    lines = segment.splitlines()
    out = []
    i = 0
    while i < len(lines):
        current = lines[i]
        if i + 1 < len(lines) and looks_like_joinable(current, lines[i + 1]):
            current = current.rstrip() + " " + lines[i + 1].lstrip()
            i += 2
            while i < len(lines) and looks_like_joinable(current, lines[i]):
                current = current.rstrip() + " " + lines[i].lstrip()
                i += 1
            out.append(current)
        else:
            out.append(current)
            i += 1
    result = "\n".join(out)
    if segment.endswith("\n") and not result.endswith("\n"):
        result += "\n"
    return result


def normalize_markdown(text: str) -> str:
    parts = re.split(r"(```[\s\S]*?```)", text)
    normalized = []
    for part in parts:
        if part.startswith("```"):
            normalized.append(part)
        else:
            normalized.append(normalize_segment(part))
    result = "".join(normalized)
    if text.endswith("\n") and not result.endswith("\n"):
        result += "\n"
    return result


def main() -> None:
    changed = []
    for path in sorted(CHAPTERS.glob("*.md")):
        original = path.read_text(encoding="utf-8")
        fixed = normalize_markdown(original)
        if fixed != original:
            path.write_text(fixed, encoding="utf-8")
            changed.append(path.name)
    print("changed", len(changed), "files")
    for name in changed:
        print(name)


if __name__ == "__main__":
    main()
