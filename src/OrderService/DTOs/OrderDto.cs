namespace OrderService.DTOs;

public class OrderDto
{
    public Guid Id { get; set; }
    public string SenderCity { get; set; }
    public string SenderAddress { get; set; }
    public string RecipientCity { get; set; }
    public string RecipientAddress { get; set; }
    public float Weight { get; set; }
    public DateTime Date { get; set; }
}
