export const displayPrice = (priceToDisplay: number): string => {
	const roundedPrice = Math.ceil(priceToDisplay * 100) / 100;
	const price = {
		currency: 'EUR',
		amount: roundedPrice
	};
	return price.amount.toLocaleString('fr-FR', { style: 'currency', currency: price.currency });
};
