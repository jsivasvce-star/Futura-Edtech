Add-Type -AssemblyName System.Drawing

$p = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656323957.jpg"
$img = [System.Drawing.Bitmap]::new($p)
$w = $img.Width
$h = $img.Height

Write-Host "Background Dimensions: $w x $h"

# Find white scale bounds (very bright white pixels: R>200, G>200, B>200)
$whitePixels = @()
for ($y = [int]($h * 0.5); $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.R -gt 210 -and $c.G -gt 210 -and $c.B -gt 210) {
            $whitePixels += [System.Drawing.Point]::new($x, $y)
        }
    }
}

$minX = ($whitePixels | Measure-Object -Property X -Minimum).Minimum
$maxX = ($whitePixels | Measure-Object -Property X -Maximum).Maximum
$minY = ($whitePixels | Measure-Object -Property Y -Minimum).Minimum
$maxY = ($whitePixels | Measure-Object -Property Y -Maximum).Maximum

Write-Host "White Scale Area: X from $minX to $maxX ($($maxX - $minX) px), Y from $minY to $maxY ($($maxY - $minY) px)"

# Analyze the top surface of the scale where cars roll
# Let's inspect rows around minY to find the top surface track
for ($y = $minY - 10; $y -le $minY + 40; $y += 5) {
    $cMid = $img.GetPixel([int]($w/2), $y)
    Write-Host "Row y=$y (center pixel): ($($cMid.R), $($cMid.G), $($cMid.B))"
}

# The scale vertical front face with numbers starts around y ≈ 410..420
# Top horizontal groove surface where wheels sit is around y ≈ 380..415!
$img.Dispose()
