    import  Budgets  from "./budgets/budgets"
    import  Events  from "./events/Events"
    import Notifications from "./notifications/notifications"
    import Welcome from "./Welcome"


const PartnerHome = () => {



        return(
            <>
            <div className="flex justify-between">
                <div>
                    <Welcome/>
                    <Budgets/>
                    <Events/>
                </div>
                <div>
                    <Notifications/>
                </div>
            </div>
                
            </>


        )
    }
export default PartnerHome;