#!/usr/bin/php

<?php
$inputText = file_get_contents("input.txt");
$input = explode(",", $inputText);

// Given examples
// $input = [1,0,0,0,99];
// $input = [2,3,0,3,99];
// $input = [2,4,4,5,99,0];
// $input = [1,1,1,4,99,5,6,0,99];

$output = runIntCodeProgramWithInputs($input, 12, 2);

echo "Part 1 Answer: ".$output."\n";

$nounAndVerb = findNounAndVerbThatProduces(19690720, $input);
$noun = $nounAndVerb[0];
$verb = $nounAndVerb[1];
echo "Part 2 Answer: 100 * ".$noun." + ".$verb." == ".(100 * $noun + $verb)."\n";

function runIntCodeProgramWithInputs($state, $noun, $verb)
{
	$state[1] = $noun;
	$state[2] = $verb;
	return processIntCodeState($state)[0];
}

function processIntCodeState($state)
{
	$stopped = false;
	$position = 0;
	
	while (!$stopped)
	{
		$opcode = (int)$state[$position];
		if ($opcode == 99)
		{
			$stopped = true;
			continue;
		}
		$in1 = (int)$state[$state[$position + 1]];
		$in2 = (int)$state[$state[$position + 2]];
		$outPos = (int)$state[$position + 3];
		$value = 0;
		if ($opcode == 1)
		{
			$value = $in1 + $in2;
		}
		else if ($opcode == 2)
		{
			$value = $in1 * $in2;
		}
		$state[$outPos] = $value;
		$position += 4;
	}
	
	return $state;
}

function findNounAndVerbThatProduces($value, $input)
{
	for ($noun = 0; $noun < 100; $noun++)
	{
		for ($verb = 0; $verb < 100; $verb++)
		{
			$output = runIntCodeProgramWithInputs($input, $noun, $verb);
			if ($output == $value)
			{
				return [$noun, $verb];
			}
		}
	}
}

?>