const MENU_BTN = document.getElementById("menu-btn")
const NAV_LIST = document.querySelector(".nav-list")
const NAV_LINKS = document.querySelectorAll(".nav-link")
const REWARDS = document.querySelectorAll(".reward")

MENU_BTN.addEventListener("click", () => {
    NAV_LIST.classList.toggle("show-list")
})

document.addEventListener("scroll", () => {
    NAV_LIST.classList.remove("show-list")
})

NAV_LINKS.forEach((link) => {
    link.addEventListener("click", () => {
        NAV_LIST.classList.remove("show-list")
    })
})

const MODAL = document.querySelector(".modal")
const MODAL_CLOSE_BTN = document.querySelector(".modal-close")
const MODAL_ACCESS = document.querySelector(".back-project")
const initialModal = document.querySelector(".modal-content")


MODAL_ACCESS.addEventListener("click", () => {
    initialModal.style.display = "block"
    removeColouredMark()
    lightBorders()
    MODAL.style.display = "block"
})  

REWARDS.forEach((reward) => {
    reward.addEventListener("click", () => {
        initialModal.style.display = "block"
        MODAL.style.display = "block"
    })
})

MODAL_CLOSE_BTN.addEventListener("click", () => {
    MODAL.style.display = "none"
})

const chosenPledge = document.querySelectorAll(".mark")
const pledgeEntry = document.querySelectorAll(".pledge-entry")

function closeAllPledgeEntries() {
    pledgeEntry.forEach((entry) => {
        entry.style.display = "none"
    })
}

function removeColouredMark() {
    chosenPledge.forEach((btn) => {
            btn.style.backgroundColor = "transparent"
        })
}

function lightBorders() {
    chosenPledge.forEach((choice) => {
        choice.parentElement.parentElement.style.border = "1px solid hsl(0, 0%, 48%)"
        choice.parentElement.parentElement.style.transition = "all ease-in-out .25s"
    })
}

chosenPledge.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (choice.classList.contains("no-reward")) {
            initialModal.style.display = "none"
        }
        closeAllPledgeEntries()
        let entryForm = choice.parentElement.parentElement.children[3]
        entryForm.style.display = "block"
        removeColouredMark()
        lightBorders()
        choice.parentElement.parentElement.style.border = "3px solid hsl(176, 50%, 47%)"
        choice.style.backgroundColor = "hsl(176, 50%, 47%)"
    })
})

const paymentBtn = document.querySelectorAll(".pay")
const affirmativeBtn = document.querySelector(".got-it")
const raisedAmount = document.querySelector(".raised")
const backerCount = document.getElementById("backer-count")
const progressBar = document.querySelector(".progress")
const errorMessage = document.querySelectorAll(".error-text")
let newAvailableCount = ""
let available1 = document.getElementById("available-1")
let mirrorCount1 = document.getElementById("mirror-count-1")
let available2 = document.getElementById("available-2")
let mirrorCount2 = document.getElementById("mirror-count-2")
paymentBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        if (Number(btn.previousElementSibling.value) < 25) {
            errorMessage.forEach((text) => {
                text.innerText = "Pledge is too low. Please insert the minimum amount!"
                text.style.color = "red"

                setTimeout(() => {
                    text.style.display = "none"
                }, 1500)
            })
            
        } else {
            raisedAmount.innerText = `${Number(btn.previousElementSibling.value) + Number(raisedAmount.innerText)}`
            backerCount.innerText = `${Number(backerCount.innerText) + 1 }`
            progressBar.value = (Number(btn.previousElementSibling.value) +  Number(raisedAmount.innerText))/100000 * 100
            initialModal.style.display = "none"
            
            let availableCount = Number(btn.parentElement.parentElement.previousElementSibling.children[0].innerText)
            let newAvailableCount = btn.parentElement.parentElement.previousElementSibling.children[0]
            newAvailableCount.innerText = availableCount - 1
            mirrorCount1.innerText = available1.innerText
            mirrorCount2.innerText = available2.innerText            
        }
        
    })
})

affirmativeBtn.addEventListener("click", () => {
    MODAL.style.display = "none"
})