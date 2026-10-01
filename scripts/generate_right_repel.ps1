Add-Type -AssemblyName System.Drawing

function Generate-RightRepelAsset {
    $attractPath = "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_attract.png"
    $repelPath = "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_repel.png"
    
    $bmp = [System.Drawing.Bitmap]::FromFile($attractPath)
    $w = $bmp.Width
    $h = $bmp.Height
    
    # We want to mirror the upper portion (magnet + lines, from y = 0 down to roughly top of antenna/jeep)
    # Let's inspect where the jeep starts:
    # In the cropped 940 x 807 image, where is the magnet center and where does the antenna end?
    # Let's create a new bitmap
    $outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Copy jeep body (lower portion) as-is
    $g.DrawImage($bmp, 0, 0)
    
    # Now let's analyze the bounding box of the upper field lines + magnet
    # In right car: antenna is around x = 620..660 (towards rear)
    # Let's find the antenna center x
    # Magnet center is directly above the antenna
    $splitY = [int]($h * 0.46) # Roughly where the antenna rod connects to the magnet base
    
    # Crop the upper section (0 to splitY)
    $upperRect = New-Object System.Drawing.Rectangle(0, 0, $w, $splitY)
    $upperBmp = $bmp.Clone($upperRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Flip the upper section horizontally
    $upperBmp.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
    
    # Clear upper portion on outBmp
    $clearBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $g.FillRectangle($clearBrush, 0, 0, $w, $splitY)
    
    # Draw flipped upper section back
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $g.DrawImage($upperBmp, 0, 0)
    
    $outBmp.Save($repelPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved right car repel asset: $repelPath"
    
    $clearBrush.Dispose()
    $upperBmp.Dispose()
    $g.Dispose()
    $outBmp.Dispose()
    $bmp.Dispose()
}

Generate-RightRepelAsset
