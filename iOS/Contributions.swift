//
//  Contributions.swift
//  GithubPulse
//
//  Created by Tadeu Zagallo on 12/30/14.
//  Copyright (c) 2014 Tadeu Zagallo. All rights reserved.
//

import Foundation

@objc(Contributions)
class Contributions : NSObject, NSXMLParserDelegate {
  var year = [Int]()
  var commits = [Int]()
  var today = 0
  var streak = 0
  var succeeded = false
  
  @objc class func fetch(username: String, completionBlock: RCTResponseSenderBlock) {
    Contributions().fetch(username, completionBlock: completionBlock)
  }
  
  func fetch(username: String, completionBlock: RCTResponseSenderBlock) {
    self.year = [];
    
    let url = NSURL(string: "https://github.com/users/\(username)/contributions")
    let request = NSMutableURLRequest(URL: url!, cachePolicy: NSURLRequestCachePolicy.ReloadIgnoringLocalAndRemoteCacheData, timeoutInterval: 30)
    request.HTTPShouldHandleCookies = false
    
    NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
      if error != nil {
        self.succeeded = false
      } else {
        self.succeeded = true
        
        let parser = NSXMLParser(data: data)
        parser.delegate = self
        parser.parse()
        
        self.calculate()
      }
      
      completionBlock([!self.succeeded, [self.commits, self.streak, self.today]])
    }
  }
  
  func calculate() {
    if !self.year.isEmpty {
      var length = self.year.count - 1
      self.today = self.year[length]
      self.streak = self.today > 0 ? 1 : 0
      self.commits = Array(self.year[length-29 ... length])
      
      for var i = length - 1; i >= 0 && self.year[i] > 0; i-- {
        self.streak++;
      }
      
      if self.streak == 1 {
        self.streak = 0
      }
    }
  }
  
  func parser(parser: NSXMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [NSObject : AnyObject]) {
    if elementName == "rect" {
      self.year.append((attributeDict["data-count"] as! String).toInt()!)
    }
  }
}
