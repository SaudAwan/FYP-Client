import Config from "../ceo-dashboard/js/config";
import Web3 from "web3";
import ABI from './abi.json'
const host = Config.host;
const contractAddress = "0x5A174cf84cFAFCE534e0D8978651170356225a1f";

export async function bookEvent(body) {
  if (!body.eventKey) {
    throw new Error("Please define eventId for booking");
  }
  if (typeof window.ethereum !== undefined) {
    try {
      const getAccounts = await window.ethereum.send("eth_requestAccounts");
      const account = getAccounts.result[0];

      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
          "wss://ws-nd-845-335-134.p2pify.com/2e0a5372f800d441070ef632047756ae"
        )
      );

      web3.eth.setProvider(Web3.givenProvider);
      const contract = new web3.eth.Contract(ABI, contractAddress);

      await contract.methods.pay().send({
          from: account,
      })
      var resp = await API("POST", {
        body: body,
        path: `/api/event/${body.eventKey}/book`,
      });
      const responseJson = await resp.json();
      return responseJson;
    } catch (err) {
      return err;
    }
  }
}

export async function fetchEvent(eventId) {
  if (!eventId) {
    throw new Error("Please define eventId for booking");
  }

  try {
    var resp = await API("GET", {
      path: `/api/event/${eventId}`,
    });
    const respJson = await resp.json();
    return respJson;
  } catch (err) {
    return err;
  }
}

async function API(method, params) {
  try {
    var url = host + params.path;
    var payload = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (method === "POST") {
      payload.body = JSON.stringify(params.body);
    }
    var resp = await fetch(url, payload);
    return resp;
  } catch (err) {
    return Promise.reject(err);
  }
}
