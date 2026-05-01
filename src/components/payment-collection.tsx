'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon } from "lucide-react"
import { getEnabledPaymentMethods, siteConfig, type PaymentMethodConfig } from "@/config/payment-config"
import { ThemeToggle } from "@/components/theme-toggle"

export function PaymentCollection() {
  const [copied, setCopied] = useState<string | null>(null)

  // 从配置文件获取启用的支付方式
  const paymentMethods: PaymentMethodConfig[] = getEnabledPaymentMethods()

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="w-full max-w-md mx-auto relative">
      {siteConfig.enableThemeToggle && (
        <div className="absolute top-0 right-0 z-10">
          <ThemeToggle />
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{siteConfig.pageTitle}</CardTitle>
          <CardDescription className="text-center">{siteConfig.pageDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={paymentMethods[0]?.id} className="w-full">
            <TabsList className="grid w-full text-xs" style={{ gridTemplateColumns: `repeat(${paymentMethods.length}, minmax(0, 1fr))` }}>
              {paymentMethods.map((method) => (
                <TabsTrigger key={method.id} value={method.id}>
                  {method.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {paymentMethods.map((method) => (
              <TabsContent key={method.id} value={method.id} className="mt-6">
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-lg font-medium">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  
                  {method.type === 'qrcode' && method.qrCodeUrl && (
                    <div className="w-64 h-64 bg-white flex items-center justify-center border rounded-md shadow-sm">
                      <img 
                        src={method.qrCodeUrl} 
                        alt={`${method.name}收款码`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  {method.type === 'address' && method.address && (
                    <div className="w-full">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <code className="text-sm truncate max-w-[250px]">{method.address}</code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(method.address!, method.id)}
                        >
                          {copied === method.id ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {method.type === 'bankcard' && method.bankCardNumber && (
                    <div className="w-full space-y-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                        <div className="space-y-2">
                          <div className="text-sm opacity-90">银行卡号</div>
                          <div className="font-mono text-lg tracking-wider">{method.bankCardNumber}</div>
                          <div className="flex justify-between items-center text-sm">
                            <span>{method.bankName}</span>
                            <span>{method.accountName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => copyToClipboard(method.bankCardNumber!, `${method.id}-card`)}
                        >
                          {copied === `${method.id}-card` ? (
                            <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4 mr-1" />
                          )}
                          复制卡号
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => copyToClipboard(method.accountName!, `${method.id}-name`)}
                        >
                          {copied === `${method.id}-name` ? (
                            <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4 mr-1" />
                          )}
                          复制姓名
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground text-center">{siteConfig.thankYouText}</p>
        </CardFooter>
      </Card>
    </div>
  )
}