<?php

$input = file_get_contents("input.txt");

$chars = str_split(trim($input));

$numberOfCharacters = count($chars);
$interval = $numberOfCharacters / 2;
$total = 0;

for($i = 0; $i < $numberOfCharacters; $i++)
{
	$thisChar = $chars[$i];
	$testCharIndex = $i + $interval;
	if ($testCharIndex >= $numberOfCharacters)
	{
		$testCharIndex = $testCharIndex - $numberOfCharacters;
	}
	$testChar = $chars[$testCharIndex];
	if ($thisChar == $testChar)
	{
		$total += intval($chars[$i]);
	}
}

echo "Total: $total\n";

?>