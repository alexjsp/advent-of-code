<?php

$input = file_get_contents("input.txt");

$chars = str_split(trim($input));

$numberOfCharacters = count($chars);
$total = 0;

for($i = 0; $i < $numberOfCharacters; $i++)
{
	if ($i == $numberOfCharacters-1)
	{
		if ($chars[$i] == $chars[0])
		{
			$total += intval($chars[$i]);
		}
	}
	elseif ($chars[$i] == $chars[$i + 1])
	{
		$total += intval($chars[$i]);
	}
}

echo "Total: $total";

?>