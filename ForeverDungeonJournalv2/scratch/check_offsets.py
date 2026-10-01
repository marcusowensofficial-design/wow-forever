# Check distance between pin centers and digit centers:
targets = [
    ("Entrance_A", 268, 322, 0.496, 0.778),
    ("1_north", 268, 108, 0.496, 0.261),
    ("1_mid_left", 223, 200, 0.413, 0.483),
    ("1_bottom_right", 311, 239, 0.576, 0.577),
    ("1_west", 147, 182, 0.272, 0.440),
    ("6_west", 124, 195, 0.230, 0.471),
    ("2_northeast", 391, 139, 0.724, 0.336),
    ("3_east_circle", 452, 208, 0.837, 0.502),
    ("4_southeast", 508, 240, 0.941, 0.580),
    ("5_west_circle", 86, 128, 0.159, 0.309),
]

w, h = 540, 414
for name, cx, cy, nx, ny in targets:
    px = nx * w
    py = ny * h
    dist = ((px - cx)**2 + (py - cy)**2)**0.5
    print(f"{name:<16}: target=({cx}, {cy}), pin=({px:.1f}, {py:.1f}), offset={dist:.2f} px")
