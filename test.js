const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = require("./data");
const cartItems = [];

async function main() {
    try {
        while (true) {
            let input = await new Promise((resolve, reject) => {
                rl.question(`กรุณาพิมพ์คำสั่ง(ดูรายการสินค้า,ดูประเภทสินค้า,เพิ่มสินค้าในตะกร้า,ลบสินค้าในตะกร้า,แสดงสินค้าในตะกร้า): `, resolve);
            });

            if (input === 'ดูรายการสินค้า') {
                console.table(data);
            } else if (input === 'ดูประเภทสินค้า') {
                const categoryCount = {};
                data.forEach(item => {
                    const category = item.category;
                    if (!categoryCount[category]) {
                        categoryCount[category] = 0;
                    }
                    categoryCount[category] += 1;
                });
                const categoryCountArray = Object.keys(categoryCount).map(category => ({
                    category: category,
                    amount: categoryCount[category]
                }));
                console.table(categoryCountArray);
            } else if (input.startsWith('เพิ่มสินค้าในตะกร้า')) {
                const parts = input.trim().split(' ');
                if (parts.length === 2) {
                    const productId = parts[1];
                    const product = data.find(item => item.product_id === productId);
                    if (product) {
                        cartItems.push(product);
                        console.log(`เพิ่มสินค้า ${product.name} ลงในตะกร้าสำเร็จ`);
                    } else {
                        console.log(`ไม่พบสินค้า`);
                    }
                } else {
                    console.log('รูปแบบข้อมูลไม่ถูกต้อง');
                }
            } else if (input.startsWith('ลบสินค้าในตะกร้า')) {
                const parts = input.trim().split(' ');
                if (parts.length === 2) {
                    const productId = parts[1];
                    const productIndex = cartItems.findIndex(item => item.product_id === productId);
                    if (productIndex !== -1) {
                        const deletedProduct = cartItems.splice(productIndex, 1)[0];
                        console.log(`ลบสินค้า ${deletedProduct.name} ออกจากตะกร้าสำเร็จ`);
                    } else {
                        console.log(`ไม่พบสินค้าในตะกร้า`);
                    }
                } else {
                    console.log('รูปแบบข้อมูลไม่ถูกต้อง');
                }
            } else if (input === 'แสดงสินค้าในตะกร้า') {
                console.table(cartItems);
            } else if (input === 'จบ') {
                break;
            } else {
                console.log("คำสั่งไม่ถูกต้อง");
            }
        }

        rl.close();
    } catch (error) {
        console.log({ error });
    }
}

main();
