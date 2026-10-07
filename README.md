<div align="center">

# BZCC Sprite & Cursor HD Generator

**One Windows GUI for Battlezone: Combat Commander cursor sheets, sprites, color maps, image processing, and game-ready export.**

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)
![PyQt5](https://img.shields.io/badge/UI-PyQt5-41CD52?style=flat-square)
![Export](https://img.shields.io/badge/export-PNG%20%7C%20TGA%20%7C%20DDS-D4B86A?style=flat-square)
![Scale](https://img.shields.io/badge/global%20scale-x1%E2%80%93x5-6B5A2B?style=flat-square)

<img width="1100" alt="BZCC Sprite Generator interface" src="https://github.com/user-attachments/assets/68572fc3-0d1f-465b-9029-f853d0307106" />

</div>

## Overview

The project combines two repetitive BZCC asset workflows in one application:

| Tool | Purpose |
|---|---|
| **Cursor Baker** | slice and preview 64-frame cursor sheets, configure hotspots/FPS, export TGA frames, and generate cursor config |
| **Sprite Generator** | process individual textures, preview changes live, scale them, and export PNG/TGA/DDS variants |

Settings such as export paths, cursor names, and processing options persist between sessions.

## Run from source

Requirements: **Windows**, **Python 3**, PyQt5, and Pillow.

```powershell
pip install PyQt5 Pillow
python BZCC_SpriteGenerator.py
```

The repository also includes `texconv.exe` for DDS conversion plus Photoshop and After Effects cursor-template helpers.

## Cursor Baker

- accepts an 8×8 / 64-frame cursor sheet or image sequence;
- frame-by-frame preview and animation playback;
- cursor name, hotspot X/Y, FPS, and anti-aliasing controls;
- batch export to TGA;
- automatic `bzgame_init_cursor.cfg` generation;
- default/highlight cursor support;
- global export multiplier from x1 through x5.

## Sprite Generator

- PNG, TGA, DDS and common source-image support;
- PNG/TGA/DDS export;
- DXT5, BC3 UNORM, BC3 sRGB, and DXT3 DDS modes;
- live file watching and preview refresh;
- grayscale, invert, normalize, alpha preservation, and resampling options;
- sharpen, blur, gamma, brightness, contrast, opacity, edge enhancement, and denoise controls;
- multi-size export variants from x1 through x5.

## Included production helpers

| File / folder | Purpose |
|---|---|
| `BZCC_SpriteGenerator.py` | main GUI |
| `CursorHD_Template.psd` | full cursor production template |
| `CursorHD_Template_simple.psd` | lighter template |
| `PS_CursorHD_Template.jsx` | Photoshop automation helper |
| `AE_CursorHD_Template.jsx` | After Effects automation helper |
| `texconv.exe` | DDS conversion backend |
| `basic_cursor/` | base cursor assets |

<details>
<summary><b>Second interface view</b></summary>

<br>
<img width="1100" alt="BZCC Sprite Generator secondary interface" src="https://github.com/user-attachments/assets/dcfb2bfe-5125-451e-866c-58b6ebc2dbe1" />
</details>


## Project network

Part of the broader **SAIPEN / vacterro** project ecosystem.

[**Author hub**](https://github.com/vacterro) · [**SAIPEN HQ**](https://github.com/saipenhq) · [**SAIPEN Core**](https://github.com/vacterro/saipen) · [**ZAICODE**](https://github.com/vacterro/zaicode) · [**FastPrompter**](https://github.com/vacterro/FastPrompter) · [**SAIPEN Community**](https://discord.gg/SEYaYkuVgN)

For reproducible bugs and durable feature requests, use [GitHub Issues](https://github.com/vacterro/BZCC-Sprite-and-CursorHD-Generator/issues).

<!-- VACTERRO_SUPPORT:BEGIN -->
---
<sub>If BZCC Sprite & Cursor HD Generator is useful to you, optional support: [Buy Me a Coffee](https://buymeacoffee.com/vacuum34) · [Boosty](https://boosty.to/vacuum34/donate) · [PayPal](https://paypal.me/AlexNelin) · [other ways](https://github.com/vacterro/vacterro/blob/main/SUPPORT.md)</sub>
<!-- VACTERRO_SUPPORT:END -->
