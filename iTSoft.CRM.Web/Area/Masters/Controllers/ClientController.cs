﻿using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientController : BaseController
    {
        ILogger _logger = null;
        ClientService CustomerMasterService = null;
        public ClientController()
        {
            _logger = Logger.GetLogger();
            CustomerMasterService = new ClientService();
        }

        [HttpPost("save")]
        public IActionResult Save(ClientMaster CustomerMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                //CustomerMaster.Password = new EncryptionHelper().Encrypt(CustomerMaster.Password);
                response.ResponseCode = CustomerMasterService.Save(CustomerMaster);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Customer-Save");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost("searchClient")]
        public IActionResult SearchClient(ClientDetails clientMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var CustomerDetails = CustomerMasterService.SearchClient(clientMaster);
                response.ResponseData = CustomerDetails;
                response.ResponseCode = ResponseCode.Success;
                
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Customer-Search");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost]
        public IActionResult GetCustomerInfo(EmployeeMasterSearchParam searchParam)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var CustomerDetails = CustomerMasterService.GetCustomerInfo(searchParam);
                if (CustomerDetails == null || CustomerDetails.Count < 1)
                    response.ResponseCode = ResponseCode.NotFound;
                else
                {
                    response.ResponseData = CustomerDetails;
                    response.ResponseCode = ResponseCode.Success;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Customer-GetCustomerInfo");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpGet]
        public IActionResult Find(long CustomerId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                ClientMaster CustomerMaster = CustomerMasterService.Find(CustomerId);
                if (CustomerMaster != null)
                {
                    response.ResponseCode = ResponseCode.Success;
                    response.ResponseData = CustomerMaster;
                }
                else
                {
                    response.ResponseCode = ResponseCode.NotFound;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Customer-Find");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Delete(ClientMaster CustomerMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseCode = CustomerMasterService.Delete(CustomerMaster);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Customer-Delete");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }
    }
}