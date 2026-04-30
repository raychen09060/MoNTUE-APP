from collections import Counter
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
exhibit_data_path = root / 'components' / 'ExhibitData.js'
output_path = root / 'assets' / 'exhibit_bg_color.txt'

with exhibit_data_path.open('r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r"img:\s*['\"](.+?)['\"]", text)
if not match:
    raise SystemExit('Could not find an img path in ExhibitData.js')

relative_img_path = match.group(1)
image_path = (exhibit_data_path.parent / relative_img_path).resolve()
if not image_path.exists():
    raise SystemExit(f'Image file not found: {image_path}')

try:
    from PIL import Image
except ImportError:
    raise SystemExit('Pillow is required to run this script. Install it with `pip install pillow`.')

image = Image.open(image_path).convert('RGB')
colors = Counter(image.getdata())
most_common = colors.most_common(1)[0][0]
hex_color = '#{:02x}{:02x}{:02x}'.format(*most_common)

output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(hex_color, encoding='utf-8')
print(f'Wrote {hex_color} to {output_path}')
