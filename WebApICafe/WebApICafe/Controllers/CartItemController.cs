using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore; // For ToListAsync()
using Microsoft.AspNetCore.Mvc;
using System.Linq; // For LINQ methods
using System.Collections.Generic;
using WebApICafe.Dto;
using WebApICafe.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI_cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartitemController : ControllerBase
    {
        private readonly CafeMgm2Context _context;

        public CartitemController(CafeMgm2Context context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
        {
            var cartItems = await (from cart in _context.Carts
                                   join product in _context.Products
                                   on cart.ProductId equals product.ProductId
                                   where cart.UserId == userId
                                   select new CartItemDto
                                   {
                                       ProductId = product.ProductId,
                                       CartId = cart.CartId,
                                       ProductName = product.Name,
                                       Price = (decimal)product.Price,
                                       ImageUrl = product.ImageUrl,
                                       Quantity = (int)cart.Quantity
                                   }).ToListAsync();

            return Ok(cartItems);
        }
    }
}
