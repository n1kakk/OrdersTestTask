using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Entities;

namespace OrderService.Repositories;

public class OrderRepo : IOrderRepo
{
    private readonly OrderDbContext _dbContext;

    public OrderRepo(OrderDbContext orderDbContext)
    {
        _dbContext = orderDbContext;
    }

    public async Task AddOrderAsync(Order order)
    {
       await _dbContext.Orders.AddAsync(order);
    }

    public async Task<List<Order>?> GetAllOrdersAsync()
    {
        var orders = await _dbContext.Orders.ToListAsync();
        return orders.Any() ? orders : null;
    }

    public async Task<Order?> GetOrderByIdAsync(Guid id)
    {
        return await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync() > 0;
    }
}
