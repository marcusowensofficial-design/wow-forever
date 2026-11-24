"""Fetch WoW Forever spell tooltips from Wowhead once each, politely.

Usage: python tools/fetch_forever_spells.py ID [ID ...]

Every answer is saved in tools/forever_spell_cache.json straight away, so no
spell is ever requested twice and an interrupted run resumes. Requests go one
at a time with a 3-5 second gap, and the run stops at the first 403 / 429 /
503 (run it again later; only the missing spells are requested).
"""
import html, json, os, random, re, sys, time, urllib.error, urllib.request

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "forever_spell_cache.json")
URL = "https://nether.wowhead.com/forever/tooltip/spell/%d"


def text(raw):
    raw = re.sub(r"<!--.*?-->", "", raw or "")
    raw = re.sub(r"<(br|/tr|/td|/th|/table)[^>]*>", "\n", raw)
    raw = html.unescape(re.sub(r"<[^>]+>", "", raw)).replace("\xa0", " ")
    return " | ".join(x.strip() for x in raw.split("\n") if x.strip())


def main(ids):
    cache = {}
    if os.path.exists(CACHE):
        with open(CACHE, encoding="utf8") as f:
            cache = json.load(f)
    todo = [i for i in dict.fromkeys(ids) if str(i) not in cache]
    print("%d cached, %d to fetch" % (len(ids) - len(todo), len(todo)), flush=True)
    for n, i in enumerate(todo):
        if n:
            time.sleep(random.uniform(3, 5))
        req = urllib.request.Request(URL % i, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                d = json.load(r)
            cache[str(i)] = {"name": d.get("name"), "icon": d.get("icon"),
                             "tooltip": text(d.get("tooltip")), "buff": text(d.get("buff"))}
        except urllib.error.HTTPError as e:
            if e.code != 404:
                sys.exit("HTTP %d on spell %d: stopping (progress is saved)" % (e.code, i))
            cache[str(i)] = {"name": None, "missing": True}
        tmp = CACHE + ".tmp"
        with open(tmp, "w", encoding="utf8") as f:
            json.dump(cache, f, indent=1, ensure_ascii=False, sort_keys=True)
        os.replace(tmp, CACHE)
    print("done")


if __name__ == "__main__":
    main([int(a) for a in sys.argv[1:]])
