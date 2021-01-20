import React from 'react';

const LoaderTemplate = () => (
	<div className="loader-container">
		<div>
			<svg
				style={{ width: '200px', height: '80px' }}
				viewBox="0 0 120 30"
				xmlns="http://www.w3.org/2000/svg"
				fill="#cf1d23"
			>
				<circle cx="15" cy="15" r="14.7404">
					<animate
						attributeName="r"
						from="15"
						to="15"
						begin="0s"
						dur="0.8s"
						values="15;9;15"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="fillOpacity"
						from="1"
						to="1"
						begin="0s"
						dur="0.8s"
						values="1;.5;1"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="60" cy="15" r="9.25959" attributeName="fillOpacity" from="1" to="0.3">
					<animate
						attributeName="r"
						from="9"
						to="9"
						begin="0s"
						dur="0.8s"
						values="9;15;9"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="fillOpacity"
						from="0.5"
						to="0.5"
						begin="0s"
						dur="0.8s"
						values=".5;1;.5"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="105" cy="15" r="14.7404">
					<animate
						attributeName="r"
						from="15"
						to="15"
						begin="0s"
						dur="0.8s"
						values="15;9;15"
						calcMode="linear"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="fillOpacity"
						from="1"
						to="1"
						begin="0s"
						dur="0.8s"
						values="1;.5;1"
						calcMode="linear"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	</div>
);
export default LoaderTemplate;
