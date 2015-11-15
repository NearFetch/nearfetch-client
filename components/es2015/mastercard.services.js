class MastercardServices {
	constructor(){
		/*public key: sbpb_NWVkMTJkZTgtYWRiNC00MTVhLThjZjUtODNmZWIxNWQwNTE1
		privatekey: dtTe4IG+N8jetU19/WLNdUu6PLMmNg+bsRj7M+hp+dh5YFFQL0ODSXAOkNtXTToq
		*/
	    this.public_key = "sbpb_NWVkMTJkZTgtYWRiNC00MTVhLThjZjUtODNmZWIxNWQwNTE1";
	    this.private_key="dtTe4IG+N8jetU19/WLNdUu6PLMmNg+bsRj7M+hp+dh5YFFQL0ODSXAOkNtXTToq";
	    this.testcards=[{number:"5105105105105100",
						cvc:"404",
						expireMonth:"01",
						expireYear:"19"},
						{number:"4111111111111111",
						cvc:"404",
						expireMonth:"01",
						expireYear:"19"}];
	    
	}
	getSimplifyClient(){
		this.client = Simplify.getClient({
	        publicKey: this.public_key,
	        privateKey: this.private_key
	    });
	    return this.client;
	}
	
	payment(paymentObject,callback){
		var testPaymentObject={	amount:1000,
							description:"descriptiontext",
							invoiceId:"1232123",
							card:testcards[0]};

		paymentObject=testPaymentObject;
							
		var client=this.getSimplifyClient();
		client.payment.create({
		    amount : paymentObject.amount,
		    description : paymentObject.description,
		    invoice : paymentObject.invoiceId,
		    card : {
		       expMonth : paymentObject.card.expireMonth,
		       expYear : paymentObject.card.expireYear,
		       cvc : paymentObject.card.cvc,
		       number : paymentObject.card.number
		    }
		},function(res){
			console.log({"paymentresponse":res});
			callback();
		});
	}

	createToken(callback){
		var cc=this.testcards[0];
		var client=this.getSimplifyClient();
		client.cardtoken.create({
		    card : {
		       addressState : "MO",
		       expMonth : cc.expireMonth,
		       expYear : cc.expireYear,
		       addressCity : "OFallon",
		       cvc : cc.cvc,
		       number : cc.number
		    }
		},function(resp){
			console.log({"createtokenResponse":resp});
			callback(resp);
		});

	}
	requestToken(carddetails,callback){
		carddetails=this.testcards[0];
		var req={
            key: this.public_key,
            card: {
                number: carddetails.number,
                cvc: carddetails.cvc,
                expMonth: carddetails.expireMonth,
                expYear: carddetails.expireYear
            }
        };
        console.log({"requestToken":req});
		SimplifyCommerce.generateToken(req, function(resp){
        	console.log({"requesttokenresponse":resp});
        	callback(resp);
        });
	}

	verify(){
		console.log("Mastercard services verification");

		this.requestToken({},function(d){
			console.log({"requestTokenCallback":d});
		});
	}

}

module.exports=MastercardServices;