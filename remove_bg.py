from PIL import Image

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Get the intensity of the pixel (grayscale equivalent)
        # Using the average of RGB or max of RGB
        r, g, b, a = item
        intensity = max(r, g, b)
        
        # We map intensity to alpha. If it's black (0), alpha is 0.
        # But we also keep the color bright.
        # To avoid dark rims, if alpha is low, we make the color more cyan/white.
        newData.append((r, g, b, intensity))

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_black_background("C:\\Users\\GANES\\.gemini\\antigravity-ide\\brain\\19748050-07e2-4565-9c0b-b0c512ca2588\\water_splash_isolated_1791355697791.jpg", "C:\\Users\\GANES\\Futura-Edtech\\src\\science\\class6\\chapter8\\assets\\splash_realistic.png")
print("Done")
