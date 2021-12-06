#!/usr/bin/php

<?php

$totalPasswords = 0;
$totalPart2Passwords = 0;
for ($number = 353096; $number <= 843212; $number++)
{
	$twoAdjacentTheSame = false;
	$twoAdjacentTheSameNotLargerGroup = false;
	$alwaysAscending = true;
	for ($i = 0; $i < strlen($number) - 1; $i++)
	{
		$a = substr($number, $i, 1);
		$b = substr($number, $i+1, 1);
		if ($a == $b) {
			$twoAdjacentTheSame = true;
			if (substr($number, $i-1, 1) != $a
				&& substr($number, $i+2, 1) != $a)
			{
				$twoAdjacentTheSameNotLargerGroup = true;
			}
		}
		if ($a > $b) { $alwaysAscending = false; }
	}
	
	if ($twoAdjacentTheSame && $alwaysAscending)
	{
		$totalPasswords++;
		if ($twoAdjacentTheSameNotLargerGroup)
		{
			$totalPart2Passwords++;
		}
	}
}

echo "Part 1 Answer: ".$totalPasswords."\n";
echo "Part 2 Answer: ".$totalPart2Passwords."\n";
	
?>