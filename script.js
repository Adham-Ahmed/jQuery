let productElement="";
let cartArrOfObjs=[]
let currentCart=""
let total=0;


$(document).ready(
    ()=>
    {
        displayItems();

        $( ".card" ).click((event) => {
            EleToAdd=$(event.target).parent()
            addToCart(EleToAdd)
            refreshTotal(total);

           
        });
        
          $("#cart").click((event)=>
          {
              removeItem(event.target)
          })
          
          enableDrag();

    }   
)
   

function displayItems()
{
    items.forEach(item => {
    productElement+=
`
<div class="card" >
<img class="card-img-top w-50" src="images/${item.img}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.name}</h5>
  <p class="card-text">Price: ${item.price} L.E</p>
  <a href="#" class="btn btn-primary">Add to Cart</a>
</div>
</div> 
<br> 
`
    
});

$("#product").html(productElement);

}

function refreshTotal(total)
{
    $("#total").html(
        `
        <h5>Sub Total : <strong>${total}</strong> L.E</h5> 
        <h5>VAT : <strong>${(total*0.14) .toFixed(2)}</strong> L.E</h5> 
        <h5>Delivery fees : <strong>0</strong> L.E</h5> 
        <hr>
        <h4>Total :<strong> ${(total*1.14) .toFixed(2)}</strong>  L.E</h5> 
        <br> 
        `
    )
}

function removeItem(thisx)
{
    let cardToRemove=$(thisx).parent().parent();
    // console.log(cardToRemove.html())
    let priceString=cardToRemove.children(".card-body").children("p").html()
    price=priceString.match(/\d+/)[0]
    total-=price;
    cardToRemove.remove()
    refreshTotal(total)
}

function addToCart(thisx)
{
    currentCart=$("#cart").html();
    let CardToAdd=$(thisx).clone().children(".card-body").children("a").text("Remove").attr("class"," btn btn-danger Remove").end().parent(".card").html();
    // console.log("card to add")
    // console.log(CardToAdd);
    CardToAdd="<div class='card'>"+CardToAdd+"</div> <br>"
    // console.log($("#cart"))
    let priceString=$(thisx).clone().children(".card-body").children("p").html()
    price=priceString.match(/\d+/)[0]
    total+=Number(price);
    currentCart+=CardToAdd
    $("#cart").html(currentCart);
}

function enableDrag()
       {
        $( ".card" ).draggable({
            appendTo: '#cart',
            connectToSortable: ".sortable",
            cursor: "crosshair",
            revert: true
          });
          addToCart(thisx)
        }