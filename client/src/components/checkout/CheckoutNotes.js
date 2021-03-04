import React from "react";

const CheckoutNotes = () => {
  return (
    <div>
      <div
        alt="div1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "3vw" }}>Checkout</div>
        {cartItems.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              ></div>
              <div className="products-cart">
                {/* Cart Map */}
                {cartItems.map((product) => (
                  <div
                    style={{
                      display: "flex",
                      border: ".5px solid rgb(202, 201, 201)",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      alt="Image"
                      style={{
                        flex: "0 32%",
                        // height: "100%",
                      }}
                    >
                      {images
                        .filter((img) => img === product.pic)
                        .map((image) => (
                          <img
                            style={{ maxWidth: "50%" }}
                            src={configureImage(image)}
                            key={image.id}
                            alt={image}
                            // width="300"
                            // height="200"
                            className="image"
                          />
                        ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: "0 32%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "100px",
                        alignContent: "space-between",
                        paddingTop: "5%",
                        paddingLeft: "5%",
                      }}
                    >
                      <div style={{ flex: "1", fontSize: "2vw" }}>
                        {product.name}
                      </div>

                      <div style={{ flex: "1", fontSize: "1vw" }}>
                        Quantity: {product.quantity}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: "0 32%",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                        paddingTop: "5%",
                      }}
                    >
                      <i
                        className="fas fa-trash"
                        style={{
                          fontSize: "30px",
                          cursor: "pointer",
                          flex: "1",
                        }}
                        onClick={() => this.deleteItemFromCart(product.id)}
                      ></i>
                      <div>
                        $ {(product.quantity * product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "1.5vw" }}>
                Subtotal: {calculatePrice(cartItems)}
              </div>
            </div>

            <StripeCheckout
              stripeKey="pk_test_51HRR6vLy5lfW1D11d6a8V00UYam21Muy9gQ6301LeBxwkDOzRTDao1Bo7WC6HQQR3kxUfgXRCnDiXg9dsSS6RYZT00v2nJb2v4"
              style={{ marginBottom: "3rem" }}
              token={handleToken}
              amount={calculatePrice(cartItems)}
              name="Furnitecture"
              billingAddress
              shippingAddress
            />
          </>
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </div>
    </div>
  );
};

export default CheckoutNotes;
