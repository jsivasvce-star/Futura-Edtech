Add-Type -AssemblyName System.Drawing

$carLeft = [System.Drawing.Bitmap]::new("public/MagnetInteraction/car_left_facing_right.png")
$w = $carLeft.Width
$h = $carLeft.Height
Write-Host "car_left_facing_right: $w x $h"

# In car_left_facing_right (facing right, hood on right):
# Left wheel is rear wheel around x = 217, y = 305
# Right wheel is front wheel around x = 740, y = 305
# Wheel radius is ~65px

# Extract isolated wheel disc
$wheelBmp = New-Object System.Drawing.Bitmap 140, 140, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$cx = 217; $cy = 305; $radius = 65

for ($dy = -$radius; $dy -le $radius; $dy++) {
    for ($dx = -$radius; $dx -le $radius; $dx++) {
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)
        if ($dist -le $radius) {
            $px = $cx + $dx
            $py = $cy + $dy
            if ($px -ge 0 -and $px -lt $w -and $py -ge 0 -and $py -lt $h) {
                $c = $carLeft.GetPixel($px, $py)
                $wheelBmp.SetPixel($dx + 70, $dy + 70, $c)
            }
        }
    }
}
$wheelBmp.Save("public/MagnetInteraction/wooden_car_wheel.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved public/MagnetInteraction/wooden_car_wheel.png"

$carLeft.Dispose()
$wheelBmp.Dispose()
