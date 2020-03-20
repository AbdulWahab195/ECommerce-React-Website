export const addToCart = async(props, toast, data) => {
    console.log(data);
    const { addToCartProduct, getCartProduct } = props;
    await addToCartProduct(data, 1);
    const custom_attribute_obj = data.custom_attributes.find(x => x.attribute_code === 'c2c_link_sku');
    if(custom_attribute_obj) {
        await addToCartProduct({ sku: custom_attribute_obj.value }, 1)
    }
    getCartProduct();

    toast.success("Product is added to the cart", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}