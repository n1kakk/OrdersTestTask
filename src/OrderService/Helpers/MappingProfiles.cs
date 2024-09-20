using AutoMapper;
using OrderService.DTOs;
using OrderService.Entities;

namespace OrderService.Helpers;

public class MappingProfiles: Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateOrderDto, Order>();
        CreateMap<Order, OrderDto>();
    }
}
