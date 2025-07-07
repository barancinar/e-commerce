using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<CartDTO>> GetCart()
    {
        // Check if the customerId cookie exists
        return CartToDTO(await GetOrCreateCartAsync(GetCustomerId()));
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCartAsync(GetCustomerId());
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return NotFound("Product not found in the database.");
        }
        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));
        }

        return BadRequest(new ProblemDetails
        {
            Title = "Error adding item to cart",
            Detail = "An error occurred while adding the item to the cart."
        });
    }

    [HttpDelete]
    public async Task<ActionResult<Cart>> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCartAsync(GetCustomerId());
        cart.DeleteItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result)
        {
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));
        }
        return BadRequest(new ProblemDetails
        {
            Title = "Error deleting item from cart",
            Detail = "An error occurred while deleting the item from the cart."
        });

    }

    private string GetCustomerId()
    {
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }

    private async Task<Cart> GetOrCreateCartAsync(string custId)
    {
        var cart = await _context.Carts.Include(c => c.CartItems)
                                        .ThenInclude(i => i.Product)
                                        .Where(c => c.CustomerId == custId)
                                        .FirstOrDefaultAsync();

        if (cart == null)
        {
            var customerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTimeOffset.UtcNow.AddDays(30),
                    IsEssential = true,

                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            cart = new Cart
            {
                CustomerId = customerId,
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;

    }

    private CartDTO CartToDTO(Cart cart)
    {
        return new CartDTO
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItems = cart.CartItems.Select(item => new CartItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                ImageUrl = item.Product.ImageUrl,
                Quantity = item.Quantity
            }).ToList()
        };
    }

}