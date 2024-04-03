const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// wait for the user to respond
async function main() {

    try {
        const data = require("./data");
        const cartItems = [];
        while (true) {
            let input = await new Promise((resolve, reject) => {
                rl.question(`กรุณาพิมพ์คำสั่ง(ดูรายการสินค้า,ดูประเภทสินค้า,เพิ่มสินค้าในตะกร้า,ลบสินค้าในตะกร้า,แสดงสินค้าในตะกร้า): `, resolve);
            });
            if (input === 'ดูรายการสินค้า') {
                console.table(data.map(item => ({ ...item, balance: item.quantity - cartItems.filter(cartItem => cartItem === item.name).length})));
                // console.table(data);
            } else if (input === 'ดูประเภทสินค้า') {
                const categoryCount = {};
                data.forEach(car => {
                    const category = car.category;
                    if (!categoryCount[category]) {
                        categoryCount[category] = 0;
                    }
                    categoryCount[category] += 1;
                });
                const categoryCountArray = Object.keys(categoryCount).map((category) => ({
                    category: category,
                    amount: categoryCount[category]
                }));
                console.table(categoryCountArray);
            } else if (input.startsWith('เพิ่มสินค้าในตะกร้า')) {
                const parts = input.trim().split(' ');
                // console.log(parts);
                if (parts.length === 2) {
                    const productId = parts[1];
                    const product = data.find(item => item.product_id === productId);

                    if (product) {

                        cartItems.push(product.name);
                        // console.log(cartItems);
                        console.log(`เพิ่มสินค้า ${product.name} สำเร็จ`);
                    } else {
                        console.log(`ไม่พบสินค้า`);
                    }
                } else {
                    console.log('รูปแบบข้อมูลไม่ถูกต้อง');
                }
            } else if (input.startsWith('ลบสินค้าในตะกร้า')) {
                const parts = input.trim().split(' ');
                // console.log(parts);
                if (parts.length === 2) {
                    const productId = parts[1];
                    const product = data.find(item => item.product_id === productId);
                    if (product) {
                        const index = cartItems.indexOf(product.name);
                        if (index > -1) {
                            cartItems.splice(index, 1);
                        }
                        // console.log(cartItems);
                        console.log(`ลบสินค้า ${product.name} สำเร็จ`);
                    } else {
                        console.log(`ไม่พบสินค้าในตะกร้า`);
                    }
                } else {
                    console.log('รูปแบบข้อมูลไม่ถูกต้อง');
                }

            } else if (input === 'แสดงสินค้าในตะกร้า') {

                const cartCount = new Map();
                cartItems.forEach(item => {
                    if (cartCount.has(item)) {
                        cartCount.set(item, cartCount.get(item) + 1);
                    } else {
                        cartCount.set(item, 1);
                    }
                });

                // console.log(cartCount);

                const total = Array.from(cartCount.values()).reduce((acc, count) => acc + count, 0);
                cartCount.set('รวม', total);

                const totalPrice = Array.from(cartCount.entries()).reduce((acc, [item, count]) => {
                    const product = data.find(p => p.name === item);
                    if (item === 'รวม') {
                        return acc;
                    } else {
                        return acc + (product.price * count);
                    }
                }, 0);
                cartCount.set('รวม', totalPrice);
                

                const cartItemsData = Array.from(cartCount.entries()).map(([item, count]) => {
                    const product = data.find(p => p.name === item);
                    if (item === 'รวม') {
                        return {
                            name: item,
                            price: '',
                            amount: '',
                            allprice: totalPrice
                        };
                    } else {
                        return {
                            name: item,
                            price: product.price,
                            amount: count,
                            allprice: product.price * count
                        };
                    }
                });

                console.table(cartItemsData);
            }
            else {
                reject("คำสั่งไม่ถูกต้อง")
            }
        }
        rl.close();
    } catch (error) {
        console.log({ error });
    }
}

main()
