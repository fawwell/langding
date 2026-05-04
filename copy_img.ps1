$source = "C:\Users\onekt\.gemini\antigravity\brain\d76a4097-e011-407e-b3da-7825d2336d1b\cyberpunk_human_1777797761900.png"
$dest = "\\wsl.localhost\Ubuntu\home\onekt\projects\sportcoach\frontend\public\images\cyberpunk_human.png"
Copy-Item -Path $source -Destination $dest -Force
