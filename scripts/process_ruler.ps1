Add-Type -AssemblyName System.Drawing

$rulerSrc = [System.Drawing.Bitmap]::new("C:\Users\akash\.gemini\antigravity-ide\brain\e30702f7-57d8-43ee-979d-af3dd6d9f205\wooden_metric_scale_ruler_1790575564882.jpg")
$w = $rulerSrc.Width
$h = $rulerSrc.Height

$rulerBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $rulerSrc.GetPixel($x, $y)
        $r = [int]$c.R; $g = [int]$c.G; $b = [int]$c.B
        
        # White background threshold
        $isBg = ($r -gt 235 -and $g -gt 235 -and $b -gt 235)
        
        if (-not $isBg) {
            $rulerBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        } else {
            $rulerBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

Write-Host "Ruler bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
$rect = New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
$cropped = $rulerBmp.Clone($rect, $rulerBmp.PixelFormat)
$cropped.Save("public/MagnetInteraction/wooden_ruler_scale.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved public/MagnetInteraction/wooden_ruler_scale.png ($($rect.Width) x $($rect.Height))"

$rulerSrc.Dispose()
$rulerBmp.Dispose()
$cropped.Dispose()
