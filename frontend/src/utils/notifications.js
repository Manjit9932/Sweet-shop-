// Browser Notification API
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/candy.svg',
      badge: '/candy.svg',
      ...options
    })
  }
}

export const notifyNewOrder = (orderId, customerName, amount) => {
  showNotification('New Order Received! 🎉', {
    body: `Order from ${customerName}\nAmount: ₹${amount}\nOrder ID: ${orderId}`,
    tag: 'new-order',
    requireInteraction: true
  })
}
