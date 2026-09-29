Add-Type -AssemblyName System.Drawing

function Clean-CarShadowLine($filePath) {
    Write-Host "Cleaning black line from $filePath..."
    $img = [System.Drawing.Bitmap]::FromFile($filePath)
    $w = $img.Width
    $h = $img.Height
    
    $outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $img.Dispose()

    # Clear horizontal ground shadow artifact below wheel baseline (y >= 350)
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $p = $outBmp.GetPixel($x, $y)
            # If in the bottom region (y >= 348)
            if ($y -ge 348) {
                # If outside the wheel X columns or if it's the horizontal black line
                # Wheel 1 is roughly x: 160-260, Wheel 2 is roughly x: 710-820
                $inWheel1 = ($x -ge 160 -and $x -le 265)
                $inWheel2 = ($x -ge 710 -and $x -le 815)
                
                if (-not ($inWheel1 -or $inWheel2)) {
                    # Erase anything between or outside wheels in the bottom rows
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    # For wheel bottom itself, if y >= 351, check if it's dark shadow artifact
                    if ($y -ge 351) {
                        $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    }
                }
            }
        }
    }

    $outBmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    Write-Host "Cleaned and saved $filePath"
}

Clean-CarShadowLine "c:\projects\Futura-Edtech\public\MagnetInteraction\car_left_facing_right.png"
Clean-CarShadowLine "c:\projects\Futura-Edtech\public\MagnetInteraction\car_right_facing_left.png"
