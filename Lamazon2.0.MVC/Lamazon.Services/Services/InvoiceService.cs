using AutoMapper;
using Lamazon.DataAccess.Interfaces;
using Lamazon.Domain.Models;
using Lamazon.Services.Interfaces;
using Lamazon.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Lamazon.Services.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IRepository<Invoice> _invoiceRepository;
        private readonly IMapper _mapper;

        public InvoiceService(IRepository<Invoice> invoiceRepository, IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public void CreateInvoice(InvoiceViewModel invoice)
        {
            _invoiceRepository.Insert(
                _mapper.Map<Invoice>(invoice));
        }

        public InvoiceViewModel GetInvoice(int orderId)
        {
            Invoice invoice = _invoiceRepository.GetById(orderId);
            if(invoice == null)
            {
                throw new Exception("The invoice is not generated.");
            }
            return _mapper.Map<InvoiceViewModel>(invoice);
        }
    }
}
