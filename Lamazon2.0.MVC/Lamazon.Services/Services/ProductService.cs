using AutoMapper;
using Lamazon.DataAccess.Interfaces;
using Lamazon.Domain.Models;
using Lamazon.Services.Interfaces;
using Lamazon.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Lamazon.Services.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

      

        public IEnumerable<ProductViewModel> GetAllProducts()
        {
            return _mapper.Map<IEnumerable<ProductViewModel>>(_productRepository.GetAll());
        }

        public ProductViewModel GetProductById(int id)
        {
            Product product = _productRepository.GetById(id);
            return _mapper.Map<ProductViewModel>(product);
        }

        public void CreateProduct(ProductViewModel product)
        {
            _productRepository.Insert(_mapper.Map<Product>(product));
        }


        public void UpdateProduct(ProductViewModel product)
        {
            _productRepository.Update(_mapper.Map<Product>(product));
        }

        public void RemoveProduct(int id)
        {
            _productRepository.Delete(id);
        }
    }
}
