class GridPage{

    public gridLocator = "//div[@class='ag-center-cols-container']"

    public row = `${this.gridLocator}/div[1]/div[@col-id='title']`
    public productTitle = "//input[@data-placeholder='Title']"
    public productDescription = "//textarea[@data-placeholder='Description']"
    public productPrice = "//input[@data-placeholder='Price']" 
    public productStock = "//input[@data-placeholder='Stock']" 
    public mainStock = `${this.gridLocator}/div[1]/div[@col-id='stock']`;

    public mainPrice = `${this.gridLocator}/div[1]/div[@col-id='price']`

    public stock = "'Stock'"


}
export default GridPage