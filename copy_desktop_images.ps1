$desktop = Join-Path $env:USERPROFILE 'Desktop'
$srcHuman = Join-Path $desktop 'human.png'
$srcSkeleton = Join-Path $desktop 'skeleton.png'
$destHuman = '.\frontend\public\images\human.png'
$destSkeleton = '.\frontend\public\images\skeleton.png'

if (Test-Path $srcHuman) {
    Copy-Item -Path $srcHuman -Destination $destHuman -Force
    Write-Output "Successfully copied human.png"
} else {
    Write-Output "human.png not found on Desktop"
}

if (Test-Path $srcSkeleton) {
    Copy-Item -Path $srcSkeleton -Destination $destSkeleton -Force
    Write-Output "Successfully copied skeleton.png"
} else {
    Write-Output "skeleton.png not found on Desktop"
}
