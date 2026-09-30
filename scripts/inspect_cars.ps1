Add-Type -AssemblyName System.Drawing

function Inspect-Car($filePath, $label) {
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    $w = $bmp.Width
    $h = $bmp.Height
    Write-Host "=== $label ($w x $h) ==="

    # Sample top background (y=10)
    $topColors = @()
    for ($x = 10; $x -lt $w; $x += 100) {
        $c = $bmp.GetPixel($x, 10)
        $topColors += "($($c.R),$($c.G),$($c.B))"
    }
    Write-Host "Top y=10: $($topColors -join ' ')"

    # Sample bottom background (y=$h-10)
    $botColors = @()
    for ($x = 10; $x -lt $w; $x += 100) {
        $c = $bmp.GetPixel($x, $h - 10)
        $botColors += "($($c.R),$($c.G),$($c.B))"
    }
    Write-Host "Bottom y=$($h-10): $($botColors -join ' ')"

    # Find wheel bottom by scanning from bottom up in middle of wheels
    # Let's find columns with white rims
    for ($x = 10; $x -lt $w; $x += 20) {
        for ($y = $h - 1; $y -gt 200; $y--) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -gt 200 -and $c.G -gt 190 -and $c.B -gt 170) {
                Write-Host "White tire/rim found at x=$x, y=$y (R=$($c.R), G=$($c.G), B=$($c.B))"
                break
            }
        }
    }
    $bmp.Dispose()
}

Inspect-Car "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png" "Car 1 (media...33745)"
Inspect-Car "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png" "Car 2 (media...13019)"
