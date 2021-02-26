<div
  style={{
    display: "flex",
    justifyContent: "center",
    // paddingRight: "10%",
  }}
>
  {loading && <LoadingSpinner asOverlay />}
  {products
    .filter((p) => p._id === look.productId)
    .map((product, i) => (
      <div key={product.id} style={{ margin: "5%", alignItems: "center" }}>
        {images
          .filter((img) => img === look.imgName)
          .map((image, i) => (
            <Fade right>
              <div
                key={i}
                style={{
                  display: "flex",
                  marginTop: "5%",
                  maxWidth: "45%",
                  minWidth: "40%",
                }}
              >
                <img
                  style={{ width: "700px", height: "auto" }}
                  src={configureImage(image)}
                  key={image.id}
                  alt={image}
                />

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    padding: "5%",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // backgroundColor: "black",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  {/* <div style={{ minWidth: "500px" }}> */}
                  <h1>{product.name}</h1>
                  <h3>{product.description}</h3>
                  <h1>${product.price}</h1>
                  {/* </div> */}
                  <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </Button>
                  <ArrowBackIcon
                    onClick={() => closerLook("", "")}
                    fontSize="large"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {/* <img
                          src="https://i.imgur.com/RfjKEsP.gif"
                          style={{ height: "50%", paddingTop: "25%" }}
                          alt="Gorilla dancing"
                        ></img> */}
              </div>
            </Fade>
          ))}
      </div>
    ))}
</div>;
