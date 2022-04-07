
export const getOrderSide = (orderAccount: any): string => {
    console.log('Jsonify: ', JSON.stringify(orderAccount.orderSide));
    if (JSON.stringify(orderAccount.orderSide) === JSON.stringify({ buy: {} })) {
        return 'BuySide';
    }
    return 'SellSide';
}
