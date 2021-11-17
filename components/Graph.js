import {Group} from '@visx/group';
import {Bar} from '@visx/shape';
import {Text} from '@visx/text';
import {AxisBottom, AxisLeft} from '@visx/axis';
import {scaleLinear, scaleBand} from '@visx/scale';
import Country from "../store/countryStore";
import Cov from "../store/covStore";

const virData = [
	{countryName: 'Uganda', cases: '30', deaths: '9'},
	{countryName: 'Mongolia', cases: '8', deaths: '1'},
	{countryName: 'New Zealand', cases: '70', deaths: '7'},
	{countryName: 'India', cases: '200', deaths: '70'}
];
const mainVirData = {countryName: 'Chad', cases: '20', deaths: '5'};
virData.unshift(mainVirData);
const margins = {leftM: 20, topM: 20, bottomM: 20};

const getName = (d) => d.countryName;
const getCases = (d) => Number(d.cases);
const getDeaths = (d) => Number(d.deaths)

const Graph = () => {
	const width = 800;
	const height = 400;
	const half = width / 2;

	const xMax = width - margins.leftM;
	const yMax = height - margins.topM - margins.bottomM;
	const xScale = scaleBand({
		range: [0, xMax],
		round: true,
		domain: virData.map(getName),
		padding: 0.4
	});
	const yScale =scaleLinear({
		range: [yMax, 0],
		round: true,
		domain: [0, Math.max(...virData.map(getCases))]
	})

	return width < 10 ? null : (
		<section>
			<h2>Graphical</h2>
			<svg width={width} height={height}>
					{virData.map((el, i) => {
						const country = getName(el);
						const barWidth = xScale.bandwidth();
						const barHeight = yMax - (yScale(getCases(el)) ?? 0);
						const barX = xScale(country);
						const barY = yMax - barHeight;
						let color = (i === 0) ? 'rgba(233, 23, 217, 0.8)' : 'rgba(23, 233, 217, 0.8)'
						return (
							<Group 
								key={country}
								onMouseEnter={() => {
										console.log(`clicked: ${JSON.stringify(Object.values(el))}`);
									}}
							>
								<Bar									
									x={barX}
									y={barY}
									width={barWidth}
									height={barHeight}
									fill={color}				
								/>
							</Group>
						)
					})}
					<AxisBottom 
						numTicks={virData.length}
						top={yMax}
						scale={xScale}
						tickLabelProps={() => ({
							fill: 'rgb(20,20,20)',
							fontSize: 16,
							textAnchor: 'middle'
						})}
					/>
					<AxisLeft
						scale={yScale.nice()}
						numTicks={10}
						top={0}
						tickLabelProps={(e) => ({
							fill: 'rgb(20,20,20)',
							fontSize:13,
							textAnchor: 'end',
							x: 20,
							y: (yScale(e) ?? 0) + 3
						})}
					/>
			</svg>
		</section>)
};
export default Graph;
