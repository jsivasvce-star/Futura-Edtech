Add-Type -AssemblyName System.Drawing

function Extract-CarClean {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$FacingDirection # 1 = Facing Right, -1 = Facing Left
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height
    $outBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # First pass: identify car vs background pixels
    # Wheel baseline is at y ≈ 354
    $wheelBaseline = 354

    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            $brightness = ($r + $g + $b) / 3.0

            $isCar = $false

            if ($y -le $wheelBaseline + 2) {
                # Test for car components:
                # 1. Light wood body / roof / doors: warm tone
                $isWood = ($r -gt 85 -and $g -gt 50 -and ($r - $b) -gt 20)
                # 2. Window glass / reflections:
                $isWindow = ($y -ge 50 -and $y -le 160 -and $x -ge 120 -and $x -le 880 -and $r -gt 60 -and $g -gt 35)
                # 3. Headlights / taillights / chrome:
                $isLight = ($brightness -gt 130)
                # 4. Cream wheels / spokes:
                $isWheel = ($y -ge 200 -and ($r -gt 130 -and $g -gt 115))
                # 5. Dark shadows under chassis / wheel arches:
                $isCarShadow = ($y -ge 120 -and $y -le 350 -and $x -ge 25 -and $x -le 995 -and ($isWood -or $isWindow -or $isWheel -or ($r -gt 40 -and $g -gt 25 -and ($r - $b) -gt 8)))

                if ($isWood -or $isWindow -or $isLight -or $isWheel -or $isCarShadow) {
                    $isCar = $true
                }
            }

            if ($isCar) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    Write-Host "Initial Bounds for $InputPath : minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"

    # Refine mask with edge smoothing
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            $brightness = ($r + $g + $b) / 3.0

            # Pixel is inside vertical and horizontal car bounds
            if ($y -ge $minY -and $y -le $wheelBaseline -and $x -ge $minX -and $x -le $maxX) {
                # Check background darkness vs car body
                $isWood = ($r -gt 80 -and $g -gt 48 -and ($r - $b) -gt 18)
                $isLight = ($brightness -gt 120)
                $isCarBody = $isWood -or $isLight -or ($y -ge $minY + 15 -and $y -le $wheelBaseline - 5 -and $r -gt 45 -and $g -gt 28)

                if ($isCarBody) {
                    # Alpha calculation for smooth anti-aliased edge
                    $alpha = 255
                    if ($brightness -lt 55) {
                        $alpha = [int][Math]::Max(0, [Math]::Min(255, ($brightness - 20) / 35.0 * 255))
                    }
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
                } else {
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                }
            } else {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }

    # Crop tightly to car bounds
    $pad = 6
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + $pad * 2)
    $cropH = [Math]::Min($h - $cropY, ($wheelBaseline - $minY) + $pad + 2)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $cropped = $outBmp.Clone($rect, $outBmp.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved: $OutputPath ($cropW x $cropH)"

    $src.Dispose()
    $outBmp.Dispose()
    $cropped.Dispose()
}

$car1Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$car2Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

# Car 1 is facing Left -> car_right_facing_left.png
Extract-CarClean $car1Path "public/MagnetInteraction/car_right_facing_left.png" -1

# Car 2 is facing Right -> car_left_facing_right.png
Extract-CarClean $car2Path "public/MagnetInteraction/car_left_facing_right.png" 1
