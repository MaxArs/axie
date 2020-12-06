import { BigInt } from "@graphprotocol/graph-ts"
import {
  ax,
  AxieSpawned,
  AxieRebirthed,
  AxieRetired,
  AxieEvolved,
  Transfer,
  Approval,
  ApprovalForAll
} from "../generated/ax/ax"
import { Axie,Master,TransferAxie,Counter } from "../generated/schema"

export function handleAxieSpawned(event: AxieSpawned): void {

  let count = Counter.load('counter')
  if (count == null) {
    count = new Counter('counter')
    count.axiescount=BigInt.fromI32(0)
    count.masterscount=BigInt.fromI32(0)
  }

  let axie = Axie.load(event.params._axieId.toString())
  if (axie == null) {
    axie = new Axie(event.params._axieId.toString())
    count.axiescount=count.axiescount+BigInt.fromI32(1)
  }

  let owner = Master.load(event.params._owner.toHex())
  if (owner == null) {
    owner = new Master(event.params._owner.toHex())
    count.masterscount=count.masterscount+BigInt.fromI32(1)
  }

  axie.genes=event.params._genes
  axie.owner=event.params._owner.toHex()
  axie.save()

  owner.save()
  count.save()
}

export function handleAxieRebirthed(event: AxieRebirthed): void {

}

export function handleAxieRetired(event: AxieRetired): void {

}

export function handleAxieEvolved(event: AxieEvolved): void {
  let axie = Axie.load(event.params._axieId.toString())
  if (axie == null) {
    axie = new Axie(event.params._axieId.toString())
  }
  axie.genes=event.params._newGenes
}

export function handleTransfer(event: Transfer): void {

  let count = Counter.load('counter')
  if (count == null) {
    count = new Counter('counter')
    count.axiescount=BigInt.fromI32(0)
    count.masterscount=BigInt.fromI32(0)
  }

  let axie = Axie.load(event.params._tokenId.toString())
  if (axie == null) {
    axie = new Axie(event.params._tokenId.toString())
  }

  let owner = Master.load(event.params._from.toHex())
  if (owner == null) {
    owner = new Master(event.params._from.toHex())
    count.masterscount=count.masterscount+BigInt.fromI32(1)
  }

  let newowner = Master.load(event.params._to.toHex())
  if (newowner == null) {
    newowner = new Master(event.params._to.toHex())
    count.masterscount=count.masterscount+BigInt.fromI32(1)
  }

  let trans = TransferAxie.load(event.transaction.hash.toHex())
  if (trans == null) {
    trans = new TransferAxie(event.transaction.hash.toHex())
  }
  trans.axie=axie.id
  trans.from=owner.id
  trans.to=newowner.id

  axie.owner=newowner.id

  trans.save()
  axie.save()
  owner.save()
  newowner.save()
  count.save()

}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}


// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.supportsInterface(...)
// - contract.cfoAddress(...)
// - contract.name(...)
// - contract.getApproved(...)
// - contract.ceoAddress(...)
// - contract.whitelistSetterAddress(...)
// - contract.totalSupply(...)
// - contract.marketplaceManager(...)
// - contract.tokenOfOwnerByIndex(...)
// - contract.tokenByIndex(...)
// - contract.retirementManager(...)
// - contract.paused(...)
// - contract.spawnAxie(...)
// - contract.ownerOf(...)
// - contract.balanceOf(...)
// - contract.geneManager(...)
// - contract.symbol(...)
// - contract.whitelistedByeSayer(...)
// - contract.spawningManager(...)
// - contract.whitelistedGeneScientist(...)
// - contract.whitelistedMarketplace(...)
// - contract.getAxie(...)
// - contract.cooAddress(...)
// - contract.tokenURIPrefix(...)
// - contract.whitelistedSpawner(...)
// - contract.tokenURI(...)
// - contract.tokenURISuffix(...)
// - contract.isApprovedForAll(...)