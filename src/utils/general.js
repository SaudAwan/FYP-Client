import { notification } from 'antd';

export const removeHtmlTagsRegex = /<[^>]*>/g;

export const showNotification = (title, description, icon) => {
    const configs = {
        message: title,
        description,
    };

    if (icon) 
        configs.icon = icon;

    notification.open(configs);
}
