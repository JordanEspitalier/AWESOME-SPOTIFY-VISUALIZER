export const substringTool = (string : string, limit : number) =>
{
    if(string.length > limit) return `${string.substring(0, limit)}...`
    return string
}