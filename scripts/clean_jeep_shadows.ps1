Add-Type -AssemblyName System.Drawing

function Clean-JeepShadow($inputPath, $outputPath) {
    $bmp = [System.Drawing.Bitmap]::new($inputPath)
    $w = $bmp.Width
    $h = $bmp.Height
    $outBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $removedCount = 0
    $keptCount = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.A -eq 0) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                continue
            }

            # Top of car is untouched
            if ($y -le 555) {
                $outBmp.SetPixel($x, $y, $c)
                $keptCount++
                continue
            }

            # Below Y=657 is purely ground glow
            if ($y -gt 656) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                $removedCount++
                continue
            }

            # For Y between 556 and 656:
            # Check if this pixel is inside the wheel zones
            # Left wheel zone: roughly X in 250..500
            # Right wheel zone: roughly X in 920..1180
            # Outside these wheel zones below Y=555 is empty ground/shadow
            $inLeftWheel = ($x -ge 245 -and $x -le 505)
            $inRightWheel = ($x -ge 925 -and $x -le 1185)

            if (-not $inLeftWheel -and -not $inRightWheel) {
                # Between wheels or outside wheels below Y=555
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                $removedCount++
                continue
            }

            # Within wheel zones: distinguish real wheel wood from white/light-grey ground glow
            # Real wood tire/tread has warm tone (R > G > B, with R - B > 24, R > 75, G > 45)
            # Ground glow is desaturated light gray / white (R > 140, G > 130, B > 120, |R - B| < 24)
            $isWarmWood = ($c.R - $c.B -gt 22 -and $c.R -gt 70 -and $c.G -gt 45)
            $isPureGlow = ($c.R - $c.B -le 20 -or ($c.R -gt 155 -and $c.G -gt 150 -and $c.B -gt 140 -and $c.R - $c.B -lt 28))

            if ($isWarmWood -and -not $isPureGlow) {
                # Keep wheel pixel!
                $outBmp.SetPixel($x, $y, $c)
                $keptCount++
            } else {
                # White/grey ground glow inside wheel bounding box
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                $removedCount++
            }
        }
    }

    # Backup original
    $backupPath = $inputPath + ".bak"
    if (-not (Test-Path $backupPath)) {
        Copy-Item $inputPath $backupPath
    }

    $bmp.Dispose()
    $outBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    Write-Host ("Cleaned " + $outputPath + " -> Kept: " + $keptCount + ", Removed: " + $removedCount)
}

Clean-JeepShadow "public/MagnetInteraction/jeep_left_facing_right.png" "public/MagnetInteraction/jeep_left_facing_right.png"
Clean-JeepShadow "public/MagnetInteraction/jeep_right_facing_left.png" "public/MagnetInteraction/jeep_right_facing_left.png"
