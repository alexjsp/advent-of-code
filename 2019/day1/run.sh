#!/usr/bin/php

<?php

$input = file_get_contents("input.txt");
$masses = explode("\n", $input);
$totalRequiredFuel = 0.0;
$totalExtraRequiredFuel = 0.0;

foreach($masses as $mass)
{
	// Calculate required fuel for this mass (Part 1).
	$requiredFuel = fuelForMass($mass);
	$totalRequiredFuel += $requiredFuel;
	
	// Calculate extra fuel needed for fuel (Part 2).
	$extraRequiredFuelForThisMass = 0.0;
	$extraRequiredFuel = fuelForMass($requiredFuel);
	while ($extraRequiredFuel > 0.0)
	{
		$extraRequiredFuelForThisMass += $extraRequiredFuel;
		$extraRequiredFuel = fuelForMass($extraRequiredFuel);
	}
	$totalExtraRequiredFuel += $extraRequiredFuelForThisMass;
	echo "$mass:\t $requiredFuel (+$extraRequiredFuelForThisMass)\n";
}

echo "\nTotal: $totalRequiredFuel";
$finalTotal = $totalRequiredFuel + $totalExtraRequiredFuel;
echo "\nTotal Including Extra: $finalTotal\n\n";

function fuelForMass($mass)
{
	return floor($mass / 3.0) - 2;
}

?>