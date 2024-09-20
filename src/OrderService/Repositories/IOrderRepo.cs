using OrderService.Entities;

namespace OrderService.Repositories;

public interface IOrderRepo
{
    Task AddOrderAsync(Order order);
    Task<bool> SaveChangesAsync();
    Task<List<Order>?> GetAllOrdersAsync();
    Task<Order?> GetOrderByIdAsync(Guid id);
}
