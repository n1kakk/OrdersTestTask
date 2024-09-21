using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OrderService.DTOs;
using OrderService.Entities;
using OrderService.Repositories;

namespace OrderService.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IOrderRepo _orderRepo;

    public OrdersController(IMapper mapper, IOrderRepo orderRepo)
    {
        _mapper = mapper;
        _orderRepo = orderRepo;
    }

    [HttpGet("orders")]
    public async Task<ActionResult<List<OrderDto>>> GetAllOrders()
    {
        var orders = await _orderRepo.GetAllOrdersAsync();
        if (orders == null) return NoContent();

        var ordersDto = _mapper.Map<List<OrderDto>>(orders);
        return Ok(ordersDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(Guid id)
    {
        var order = await _orderRepo.GetOrderByIdAsync(id);
        if (order == null) return NotFound();

        var orderDto = _mapper.Map<OrderDto>(order);
        return Ok(orderDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto createOrder)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        if (createOrder.Date < DateTime.UtcNow.Date)
        {
            ModelState.AddModelError("Date", "The date must be later than the current date.");
            return BadRequest(ModelState);
        }

        var order = _mapper.Map<Order>(createOrder);

        order.Id = Guid.NewGuid();
        await _orderRepo.AddOrderAsync(order);

        var result = await _orderRepo.SaveChangesAsync();

        if(!result) return BadRequest("Could not save changes to database");

        var newOrderDto = _mapper.Map<OrderDto>(order);

        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, newOrderDto);
    }
}
