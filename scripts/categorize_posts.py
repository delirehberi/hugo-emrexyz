#!/usr/bin/env python3
"""
Refined Post Categorizer Script for hugo-emrexyz
Classifies all posts into Turkish / English and assigns single-word categories:
- Turkish: Yazılım, Sanat, Şiir, Yaşam, Topluluk
- English: Tech, Art, Poetry, Life, Community
"""

import glob
import os
import re

TR_STOPWORDS = {
    "ve", "bir", "bu", "için", "ile", "da", "de", "çok", "olan", "gibi",
    "ama", "daha", "kadar", "sonra", "olarak", "yok", "var", "diye", "ben",
    "sen", "benim", "kendi", "neler", "nasıl", "neden", "yazı", "yazılım",
    "şey", "her", "zaman", "bunu", "böyle", "artık", "tüm", "üzerine",
    "göre", "ancak", "bizim", "yani", "çünkü", "kadar", "değil", "oldu",
    "olur", "olduğunu", "olmak", "etmek", "yapmak", "birlikte", "önce",
    "bence", "insan", "hayat", "biraz", "zaten", "bugün", "şimdi"
}

EN_STOPWORDS = {
    "the", "and", "is", "in", "to", "of", "with", "for", "that", "this",
    "as", "are", "from", "at", "it", "by", "on", "about", "how", "what",
    "you", "we", "can", "an", "be", "all", "your", "my", "not", "have",
    "has", "will", "would", "like", "use", "when", "if", "or", "so", "our",
    "i", "me", "just", "which", "there", "their", "more", "some", "them"
}

TR_CHARS = set("çğışöüÇĞİŞÖÜ")

# Explicit Category and Language Mappings by filename
KNOWN_POSTS = {
    # Turkish Sanat
    "fikret-mualla.md": ("tr", "Sanat"),
    "nazmi-ziya.md": ("tr", "Sanat"),
    "zinnur-tiryaki.md": ("tr", "Sanat"),
    "gulsum-sayim-painter.md": ("tr", "Sanat"),
    "osman-hamdi-bey.md": ("tr", "Sanat"),
    "elibelinde-motifi.md": ("tr", "Sanat"),
    "fransiz-sarayi.md": ("tr", "Sanat"),
    "leblebi-tozu.md": ("tr", "Sanat"),
    "absolit-ismail.md": ("tr", "Sanat"),
    "aguuuu.md": ("tr", "Sanat"),
    "tiyatro-spontane.md": ("tr", "Sanat"),

    # Turkish Şiir
    "bu-nedenler-nedenler.md": ("tr", "Şiir"),
    "bir-bilsen.md": ("tr", "Şiir"),
    "birseyler.md": ("tr", "Şiir"),
    "beraber.md": ("tr", "Şiir"),
    "abb1ac9a7ddde5af.md": ("tr", "Şiir"), # Yalancı umutlar
    "yine-dustum-siire.md": ("tr", "Şiir"),
    "deprefabrik-duygular.md": ("tr", "Şiir"),
    "kaybolus.md": ("tr", "Şiir"),

    # Turkish Yaşam & Deneme
    "kediler-nasillar.md": ("tr", "Yaşam"),
    "kediler-nasillar-2.md": ("tr", "Yaşam"),
    "kediler-nasillar-3.md": ("tr", "Yaşam"),
    "kedileri-kacirdim.md": ("tr", "Yaşam"),
    "feminizm-uzerine.md": ("tr", "Yaşam"),
    "evim-evdir.md": ("tr", "Yaşam"),
    "cunku-bazen-insan.md": ("tr", "Yaşam"),
    "bugune-kadarkiler.md": ("tr", "Yaşam"),
    "istanbullululuk.md": ("tr", "Yaşam"),
    "ferhangi-denemeler.md": ("tr", "Yaşam"),
    "tiramisu-tarifi.md": ("tr", "Yaşam"),
    "kpss-ve-memur-zihniyeti.md": ("tr", "Yaşam"),
    "kulturel-milliyetcilik.md": ("tr", "Yaşam"),
    "nasilim.md": ("tr", "Yaşam"),
    "nostalji-sever.md": ("tr", "Yaşam"),
    "okul-hikayesi.md": ("tr", "Yaşam"),
    "on-yil-once.md": ("tr", "Yaşam"),
    "otuzu-devirenler.md": ("tr", "Yaşam"),
    "para.md": ("tr", "Yaşam"),
    "sacmacik.md": ("tr", "Yaşam"),
    "salak.md": ("tr", "Yaşam"),
    "seffaflik-neden-bazen-sadece-hayaldir.md": ("tr", "Yaşam"),
    "sessiz-istifa-nedir.md": ("tr", "Yaşam"),
    "sukur-isyan-ve-manipulasyon.md": ("tr", "Yaşam"),
    "sus.md": ("tr", "Yaşam"),
    "susuzluk-gecer.md": ("tr", "Yaşam"),
    "tolerasyon-ulkesi.md": ("tr", "Yaşam"),
    "tralalala.md": ("tr", "Yaşam"),
    "yargi.md": ("tr", "Yaşam"),
    "yari-uyanik.md": ("tr", "Yaşam"),
    "yazi.md": ("tr", "Yaşam"),
    "yazmak-konusmaktan-iyimidir.md": ("tr", "Yaşam"),
    "yazmak-zorundayim.md": ("tr", "Yaşam"),
    "yil-2012.md": ("tr", "Yaşam"),
    "zorbaslar.md": ("tr", "Yaşam"),
    "515cbdcc.md": ("tr", "Yaşam"), # Burnout
    "5-lira-bagis-mi-olur.md": ("tr", "Yaşam"),
    "2020-hedeflerim.md": ("tr", "Yaşam"),
    "2020-hedeflerim-ikinci-ceyrek.md": ("tr", "Yaşam"),
    "2020-hedeflerim-ucuncu-ceyrek.md": ("tr", "Yaşam"),
    "2020-hedeflerim-son-ceyrek.md": ("tr", "Yaşam"),
    "gurultulu-dunyada-akil-sagligini-koruma-rehberi.md": ("tr", "Yaşam"),
    "cocugumla-evde-nasil-daha-verimli-vakit-gecirebilirim.md": ("tr", "Yaşam"),
    "cocuk-gurultusu-ayakustu-muhabbet-2.md": ("tr", "Yaşam"),
    "demokrasi.md": ("tr", "Yaşam"),
    "denemeler.md": ("tr", "Yaşam"),
    "dogru-ve-yanlis.md": ("tr", "Yaşam"),
    "evren-kusursuz-mu.md": ("tr", "Yaşam"),
    "filmin-sonu.md": ("tr", "Yaşam"),
    "hakettigini-yasamak.md": ("tr", "Yaşam"),
    "kendini-bilmek.md": ("tr", "Yaşam"),
    "mentorumun-mentoru-mentorumdur.md": ("tr", "Yaşam"),
    "saksiya-sigmamak-yazilimcilarin-sik-is-degistirmesi-uzerine.md": ("tr", "Yaşam"),
    "yeni-mezun-yazilimci-maasi.md": ("tr", "Yaşam"),
    "2021-yilinda-nasil-yazilimci-olunur.md": ("tr", "Yaşam"),
    "ozgur-yazilimci-olmak-ne-demektir.md": ("tr", "Yaşam"),
    "neden-sponsor-olunur.md": ("tr", "Yaşam"),
    "neden-teknoloji-takip-etmek-yerine-yaratmiyoruz.md": ("tr", "Yaşam"),
    "tesaduf.md": ("tr", "Yaşam"),
    "takip-ettigim-youtube-kanallari.md": ("tr", "Yaşam"),

    # Turkish Topluluk
    "aydin-yazilimci-agi-etkinlikleri.md": ("tr", "Topluluk"),
    "aydin-yazilimci-bulusmasi-notlari-1.md": ("tr", "Topluluk"),
    "aydin-yazilimci-etkinlikleri-3.md": ("tr", "Topluluk"),
    "haftalik-yazilimci-bulusmalari.md": ("tr", "Topluluk"),
    "haskell-turkiye-ikinci-meetup.md": ("tr", "Topluluk"),
    "haskell-turkiye-ilk-meetup.md": ("tr", "Topluluk"),
    "neden-etkinlik-duzenliyoruz.md": ("tr", "Topluluk"),
    "neden-etkinlikleri-ucretsiz-yapiyoruz.md": ("tr", "Topluluk"),
    "nostr-turkiye-toplulugu-yayinda.md": ("tr", "Topluluk"),
    "qdrant-vector-db-haydar-kulekci-duyuru.md": ("tr", "Topluluk"),
    "viking-night.md": ("tr", "Topluluk"),
    "yazilim-atolyesi.md": ("tr", "Topluluk"),
    "devfest-istanbul-2025.md": ("tr", "Topluluk"),

    # English Life / Personal
    "my-morning-routine.md": ("en", "Life"),
    "new-cat-in-the-office.md": ("en", "Life"),
    "what-i-want.md": ("en", "Life"),
    "why-i-love-working-at-nights.md": ("en", "Life"),
    "what-is-emoji.md": ("en", "Life"),
    "do-everyone-needs-slack-or-other-ims.md": ("en", "Life"),
    "hello-world.md": ("en", "Life"),

    # English Community
    "developer-advocacy-making-developers-love-your-services.md": ("en", "Community"),
}


def detect_language(frontmatter_raw, body_raw):
    fm_lower = frontmatter_raw.lower()
    if 'tags: en' in fm_lower or 'tags:\n  - en' in fm_lower or '"english"' in fm_lower or "'english'" in fm_lower or 'lang: en' in fm_lower or 'lang = "en"' in fm_lower:
        return 'en'
    if 'tags: tr' in fm_lower or 'tags:\n  - tr' in fm_lower or '"turkish"' in fm_lower or "'turkish'" in fm_lower or 'lang: tr' in fm_lower or 'lang = "tr"' in fm_lower:
        return 'tr'

    combined = (frontmatter_raw + " " + body_raw[:1000]).lower()
    tr_char_count = sum(1 for c in combined if c in TR_CHARS)
    if tr_char_count >= 3:
        return 'tr'

    words = re.findall(r'\b\w+\b', combined)
    tr_hits = sum(1 for w in words if w in TR_STOPWORDS)
    en_hits = sum(1 for w in words if w in EN_STOPWORDS)

    if en_hits > tr_hits:
        return 'en'
    elif tr_hits > en_hits:
        return 'tr'
    return 'tr' if tr_char_count > 0 else 'en'


def parse_post(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    is_toml = False
    is_yaml = False
    if content.startswith('+++'):
        is_toml = True
        parts = content.split('+++', 2)
        fm = parts[1]
        body = parts[2] if len(parts) > 2 else ""
    elif content.startswith('---'):
        is_yaml = True
        parts = content.split('---', 2)
        fm = parts[1]
        body = parts[2] if len(parts) > 2 else ""
    else:
        return None

    title = ""
    for line in fm.split('\n'):
        if line.strip().startswith('title =') or line.strip().startswith('title:'):
            title = line.split('=', 1)[-1] if '=' in line else line.split(':', 1)[-1]
            title = title.strip(' "\'').strip()

    tags_str = ""
    if 'tags' in fm:
        tags_str = fm

    fname = os.path.basename(filepath)
    if fname in KNOWN_POSTS:
        lang, cat = KNOWN_POSTS[fname]
    else:
        lang = detect_language(fm, body)
        if lang == 'en':
            cat = "Tech"
        else:
            cat = "Yazılım"

    return {
        'filepath': filepath,
        'is_toml': is_toml,
        'is_yaml': is_yaml,
        'fm': fm,
        'body': body,
        'title': title,
        'lang': lang,
        'cat': cat
    }


def update_post_file(info):
    fm = info['fm']
    body = info['body']
    lang = info['lang']
    cat = info['cat']

    if info['is_toml']:
        lines = [l for l in fm.split('\n') if not (l.strip().startswith('lang =') or l.strip().startswith('categories =') or l.strip().startswith('lang=') or l.strip().startswith('categories='))]
        new_lines = []
        inserted = False
        for line in lines:
            new_lines.append(line)
            if not inserted and (line.strip().startswith('title =') or line.strip().startswith('date =')):
                new_lines.append(f'lang = "{lang}"')
                new_lines.append(f'categories = ["{cat}"]')
                inserted = True
        if not inserted:
            new_lines.append(f'lang = "{lang}"')
            new_lines.append(f'categories = ["{cat}"]')

        new_fm = '\n'.join(new_lines)
        new_content = f"+++{new_fm}+++{body}"

    else:
        lines = [l for l in fm.split('\n') if not (l.strip().startswith('lang:') or l.strip().startswith('categories:'))]
        clean_lines = []
        skip_cat = False
        for line in lines:
            if line.strip().startswith('categories:'):
                skip_cat = True
                continue
            if skip_cat:
                if line.startswith('  - ') or line.startswith('    '):
                    continue
                else:
                    skip_cat = False
            clean_lines.append(line)

        new_lines = []
        inserted = False
        for line in clean_lines:
            new_lines.append(line)
            if not inserted and (line.strip().startswith('title:') or line.strip().startswith('date:')):
                new_lines.append(f'lang: "{lang}"')
                new_lines.append(f'categories:\n  - "{cat}"')
                inserted = True
        if not inserted:
            new_lines.append(f'lang: "{lang}"')
            new_lines.append(f'categories:\n  - "{cat}"')

        new_fm = '\n'.join(new_lines)
        new_content = f"---{new_fm}---{body}"

    with open(info['filepath'], 'w', encoding='utf-8') as f:
        f.write(new_content)


if __name__ == '__main__':
    import sys
    dry_run = '--apply' not in sys.argv

    posts = sorted(glob.glob('content/posts/*.md'))
    stats = {'tr': {}, 'en': {}}

    for p in posts:
        info = parse_post(p)
        if not info:
            continue
        lang = info['lang']
        cat = info['cat']
        stats[lang][cat] = stats[lang].get(cat, 0) + 1
        if not dry_run:
            update_post_file(info)
        else:
            print(f"[{lang.upper()}] [{cat:<8}] {os.path.basename(p):<45} -> {info['title'][:40]}")

    print("\n--- Summary of Categories ---")
    print("Turkish Categories:", stats['tr'])
    print("English Categories:", stats['en'])
    total_tr = sum(stats['tr'].values())
    total_en = sum(stats['en'].values())
    print(f"Total: {len(posts)} (TR: {total_tr}, EN: {total_en})")
    if dry_run:
        print("\nDry-run complete. Run with --apply to write changes.")
